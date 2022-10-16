import { BadGatewayException, CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(HttpService) private readonly httpService: HttpService,
        ) {}
    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        if(process.env.DISABLE_AUTH){
            return true
        }

        const req = ctx.switchToHttp().getRequest();
        const authorizationHeader = req.headers['authorization'] ?? req.headers.authorization;

        if(!authorizationHeader){
            throw new  UnauthorizedException();
        }
        
        try{
            const response = await this.httpService.axiosRef.get(
                `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
                {
                    headers: {
                        'Authorization': authorizationHeader,
                    }
                } 
            )
            if(response.status === HttpStatus.OK) {
                return true;
            }
     
        }catch(e){
            if(e.response.status === HttpStatus.UNAUTHORIZED) {
                throw new  UnauthorizedException();
            }

            throw new BadGatewayException();
        }
    }
}