import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TokenEntity } from './entity/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>
  ) { }

  async create(createTokenDto: CreateTokenDto): Promise<TokenEntity | any> {
    try {
      const tokenEntity: TokenEntity = new TokenEntity();
      tokenEntity.user = createTokenDto.user;
      tokenEntity.token = createTokenDto.token;
      tokenEntity.deleted_at = createTokenDto.expire_at;
      return await this.tokenRepository.save(tokenEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findAll(): Promise<TokenEntity[]> {
    return await this.tokenRepository.find();
  }

  async findOneByTokenId(tokenId: string): Promise<TokenEntity> {
    return await this.tokenRepository.findOne({ where: { token_id: tokenId } });
  }

  async findOneByToken(token: string): Promise<TokenEntity> {
    return await this.tokenRepository.findOne({ where: { token: token } });
  }

  async update(tokenId: string, updateTokenDto: UpdateTokenDto) {
    return await this.tokenRepository.update(tokenId, updateTokenDto);
  }

  async remove(tokenId: string): Promise<DeleteResult> {
    return await this.tokenRepository.softDelete(tokenId);
  }

  async delete(tokenId: string): Promise<DeleteResult> {
    return await this.tokenRepository.delete(tokenId);
  }
}
