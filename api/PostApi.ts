import { APIRequestContext, APIResponse } from '@playwright/test';

export class PostApi {
  constructor(private request: APIRequestContext) {}
  async createPost(payload: object): Promise<APIResponse> {
  return this.request.post('/posts', { 
      data: payload,
      headers: {
       'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}