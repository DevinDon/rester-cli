export const HANDLER = `import { BaseHandler } from '@rester/core';

export class {{NAME}}Handler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    return next();
  }

}
`;
