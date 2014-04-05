module Exceptions
{
    export class InvalidOperationException implements Error
    {
        public name: string = 'InvalidOperationException';
        public message: string;

        constructor(message: string)
        {
            console.log('Exception: ' + message);
            this.message = message;
        }
    }
}