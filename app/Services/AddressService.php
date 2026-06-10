<?php

namespace App\Services;

use App\Models\User;
use App\Models\Address;

class AddressService
{
    public function create(User $user,array $data): Address 
    {
        if (($data['is_default'] ?? false)) {
            $user->addresses()->update(['is_default' => false,]);
        }
        return $user->addresses()->create($data);
    }

    public function update(Address $address,array $data): Address 
    {
        if (($data['is_default'] ?? false)) {
            Address::where('user_id',$address->user_id)->update(['is_default' => false,]);
        }
        $address->update($data);
        return $address;
    }

    public function delete(Address $address): void 
    {
        $address->delete();
    }

    public function setDefault(Address $address): void 
    {
        Address::where('user_id',$address->user_id)->update(['is_default' => false,]);
        $address->update(['is_default' => true,]);
    }
}
