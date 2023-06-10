import { ApiProperty } from '@nestjs/swagger';

type Props = {
    access_token: string;
};

class TokenModel {
    @ApiProperty({ default: 'Access Token' })
    access_token: string;

    constructor({ access_token }: Props) {
        this.access_token = access_token;
    }
};
export default TokenModel;
