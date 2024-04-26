const path = require('path');
const fs = require('fs');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

const babel_loader = {
	test: /\.(js)$/,
	exclude: /node_modules/,
	use: [{
		loader: "babel-loader",
		options: {
			presets: [
			[
				'@babel/preset-env',
				{
					// 'debug': true,
					'useBuiltIns': 'usage',
					// 'corejs': { version: 3.26, proposals: true },
					'corejs': { version: 3.26 },
					'targets': [ "last 2 years", "not dead"  ]
				},
			],
			],
		},
	}],
}

//////////////////////////////////////////////////////////////////////////////

function getEditorCfg ( env, argv ) {

	const outName = 'jsonEditor';
	const srcDir = './json_editor';
	const dst_dir = 'docs';

	return {

		entry: `${srcDir}/main.js`,

		output: {
			// path: path.resolve(__dirname, 'dist/jsonEditor'),
			path: path.resolve(__dirname, dst_dir),
			filename: `${outName}.js`,
		},

		devtool: argv.mode==='production' ? undefined : 'inline-source-map',

		module: {
			rules: [
				{
					test: /\.js$/,
					use: [{
						loader: 'ifdef-loader',
						options: {
							__DEVELOP: argv.mode==='production' ? false : true,
							__EDITOR: true,
							__item: '',
						}
					}],
					exclude: /node_modules/,
				},{
					test: /\.css$/,
					use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
					exclude: /node_modules/,
				},{
					test: /\.(png|svg)$/,
					type: 'asset/inline',
				},
				babel_loader,
			],
		},

		plugins: [

			new HtmlWebpackPlugin({
				filename: `${outName}.html`,
				template: `${srcDir}/main.html`,
			}),

			new MiniCssExtractPlugin({
				filename: `${outName}.css`,
			}),

			new CopyPlugin({
				patterns: [
					{ from: path.resolve( __dirname, 'json_editor/', 'jsoneditor-nightly.js' ), to: path.resolve( __dirname, dst_dir, 'jsoneditor-nightly.js' ) },
				],
			}),
		],

		optimization: {
			minimizer: [
				`...`,
				new CssMinimizerPlugin(),
			],
		},

	};
}

//////////////////////////////////////////////////////////////////////////////

const ExtResFromSchema = {
	barPlot: { version: "0.1.0" },
	barSlider: { version: "0.1.0" },
	barSliderFull: { version: "0.1.0" },
	connectedFrames: { version: "0.1.0" },
	filledBar: { version: "0.1.0" },
	freePaint: { version: "0.1.0" },
	inputGrid: { version: "0.1.0" },
	numberLineWithAnnotations: { version: "0.1.0" },
	numbersByPictures: { version: "0.1.0" },
	pointArea: { version: "0.1.0" },
	rectArrayMarkable: { version: "0.1.0" },
	stampImages: { version: "0.1.0" },
	inputInserts: { version: "0.1.0" },
	textareaInserts: { version: "0.1.0" },
};

const extres_subdir = 'dist/ext_res';
const extres_dir = path.resolve( __dirname, extres_subdir );

const manifest_default = {
	"manifest_version": "V1",
	"name": "example-plugin",
	"version": "1.2.3",
	"repository": "https://github.com/DIPFtba/msk-oc-externalpageframes.git",
	"entryPoint": "main.html",
	"branch": "jsonEditor",
	"subdirectory": "dist/ext_res/",
	"author": "blauwaldt.it UG (haftungsbeschraenkt)",
	"license": "MIT",
	"updatePolicy": {
		"autoUpdateMinor": true,
		"ignorePatchVersion": false
	}
};

// get webpack config for online JSON editor
const getExtResFromSchemaWebPackConfig = (argv, extres) => ({

	context: path.resolve( __dirname, 'json_editor/class_extensions' ),
	entry: './main.js',
	output: {
		path: path.resolve( extres_dir, extres ),
		filename: 'main.js' ,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'ifdef-loader',
					options: {
						__CLASS: extres,
						__DEVELOP: argv.mode==='production' ? false : true,
						__EDITOR: false,
						__item: '',
					}
				}],
				exclude: /node_modules/,
			},{
				test: /\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
				exclude: /node_modules/,
			},{
				test: /\.(png|svg)$/,
				type: 'asset/inline',
			},{
				test: /\.json$/i,
				type: "asset/resource",
			}
		]
	},

	plugins: [

		new HtmlWebpackPlugin({
			filename: 'main.html',
			template: '../../examples/main.html',
		}),

		new MiniCssExtractPlugin({
			filename: 'main.css',
		}),

		new CopyPlugin({
			patterns: [
				{ from: path.resolve( __dirname, 'json_editor/schemes/', `${extres}.schema.json` ), to: path.resolve( extres_dir, extres, 'extres_cfg.schema.json' ) },
			],
		}),

	],

	optimization: {
		minimizer: [
			`...`,
			new CssMinimizerPlugin(),
			new JsonMinimizerPlugin(),
		],
	},

	devtool: argv.mode==='production' ? undefined : 'inline-source-map',
})

//////////////////////////////////////////////////////////////////////////////

function createManifestFile( extres, data ) {

	fs.mkdirSync(
		path.resolve( extres_dir, extres ),
		{ recursive: true }
	);

	const manifest = Object.assign( {},
		manifest_default,
		{
			name: extres,
			subdirectory: `${extres_subdir}/${extres}`,
		},
		data
	);

	fs.writeFileSync( path.resolve( extres_dir, extres, "manifest.json" ), JSON.stringify( manifest ) );
}

//////////////////////////////////////////////////////////////////////////////

module.exports = ( env, argv ) => {

	let cfg = getEditorCfg( env, argv );

	if ( env.WEBPACK_SERVE ) {

		if ( Array.isArray(cfg) ) {
			throw( "Error: Only one item must be selected for 'webpack serve'" );
		}
		if ( cfg.stats ) {
			delete( cfg.stats );
		}
		cfg.devtool = 'cheap-module-source-map';
		cfg.devServer = {
			open: {
				target: [ cfg.output.filename.replace( /\.js$/, '.html' ) ],
				app: {
					name: 'chrome',
					arguments: ['--remote-debugging-port=9222'],
				}
			}
		}

	} else {

		cfg = [ cfg ];
		Object.keys( ExtResFromSchema ).forEach( er =>{
			cfg.push( getExtResFromSchemaWebPackConfig( argv, er ) );
			createManifestFile( er, ExtResFromSchema[er] );
		})

	}

	return cfg;
}
