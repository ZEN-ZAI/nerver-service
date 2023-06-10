import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../../persistence/address/entity/address.entity';

type Props = {
    address_id: string;
    receiver: string;
    building_number: string;
    street: string;
    subdistrict: string;
    district: string;
    province: string;
    postal_code: string;
};

class AddressModel {
    @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
    address_id: string;
    @ApiProperty({ default: 'receiver name' })
    receiver: string;
    @ApiProperty({ default: '98/456' })
    building_number: string;
    @ApiProperty({ default: 'street' })
    street: string;
    @ApiProperty({ default: 'subdistrict' })
    subdistrict: string;
    @ApiProperty({ default: 'district' })
    district: string;
    @ApiProperty({ default: 'province' })
    province: string;
    @ApiProperty({ default: '14565' })
    postal_code: string;

    constructor({
        address_id,
        receiver,
        building_number,
        street,
        subdistrict,
        district,
        province,
        postal_code,
     }: Props) {
        this.address_id = address_id;
        this.receiver = receiver;
        this.building_number = building_number;
        this.street = street;
        this.subdistrict = subdistrict;
        this.district = district;
        this.province = province;
        this.postal_code = postal_code;
    }

    static fromAddressEntity(addressEntity: AddressEntity): AddressModel {
        const addressModel = new AddressModel({
            address_id: addressEntity.address_id,
            receiver: addressEntity.receiver,
            building_number: addressEntity.building_number,
            street: addressEntity.street,
            subdistrict: addressEntity.subdistrict,
            district: addressEntity.district,
            province: addressEntity.province,
            postal_code: addressEntity.postal_code,
        });

        return addressModel;
    }

    static fromAddressEntities(addressEntities: AddressEntity[]): AddressModel[] {
        return addressEntities.map(addressEntity => AddressModel.fromAddressEntity(addressEntity));
    }
};
export default AddressModel;
