import { ApiProperty } from '@nestjs/swagger';

type Props = {
    name: string;
    image: string;
    bio: string;
};

class ProfileModel {
    @ApiProperty({ default: 'name' })
    name: string;
    @ApiProperty({ default: '' })
    image: string;
    @ApiProperty({ default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
    bio: string;

    constructor({ name, image, bio }: Props) {
        this.name = name;
        this.image = image;
        this.bio = bio;
    }
};
export default ProfileModel;
