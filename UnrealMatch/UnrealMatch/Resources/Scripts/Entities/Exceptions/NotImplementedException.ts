module Exceptions
{
    export class NotImplementedException implements Error
    {
        public name: string = 'NotImplementedException';
        public message: string;

        constructor(message: string)
        {
            console.log('Exception (not implemented):' + message);
            this.message = message;
        }
    }
} 