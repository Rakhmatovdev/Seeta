import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();
    console.log('Request Cookies:', request.cookies); 
    const refreshToken = request.cookies[data];
    // console.log('Extracted Refresh Token:', refreshToken); 
    if (!refreshToken) {
      throw new UnauthorizedException('Token is not found');
    }
    return refreshToken;
  },
);
