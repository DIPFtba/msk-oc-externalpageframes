//
// Typdeklarationen, um einige funktionen auch in TapeScript projekten nutzen zu können
//

export class baseInits {

    constructor( cfg={} );

    postLog( event: string, data={} ): void;
    postVariable ( name: string, val: string|number|boolean ): void;
    triggerInputValidationEvent (): void;

    getChangeState ( obj:record<string, any> ): number;
    sendChangeState ( obj:record<string,any>, newState:record<string, any>|null = null ): void;

    getInitDonePromise (): Promise<void>;
    isInitDone (): boolean;
    incInitCnt (): void;
    decInitCnt (): void;
    regSendInitDone (): void;

    fsm: {
        triggerEvent( event:string):void;
    }

}