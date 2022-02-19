import 'colorts/lib/string';

class Console {

  log(message: string): void {
    globalThis.console.log(message);
  }

  error(err: Error): void {
    this.log(`${err.name}: ${err.message}`.red);
    if (err.stack) {
      const stack = err.stack.split('\n').slice(1).join('\n')
      this.log(stack.grey);
    }
  }
}

export const console = new Console();
export default console;