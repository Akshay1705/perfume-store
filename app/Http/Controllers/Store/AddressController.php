<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AddressService;
use App\Http\Requests\Store\AddressRequest;
use App\Models\Address;


class AddressController extends Controller
{
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        $addresses = $user->addresses()
            ->latest()
            ->get();

        return Inertia::render(
            'Store/Addresses/Index',
            [
                'addresses' => $addresses,
            ]
        );
    }
    public function create(): Response
    {
        return Inertia::render(
            'Store/Addresses/Create'
        );
    }
    public function store(
        AddressRequest $request,
        AddressService $service
    ) {
        $user = Auth::user();
        $service->create(
            $user,
            $request->validated()
        );

        return redirect()
            ->route('addresses.index')
            ->with(
                'success',
                'Address added successfully.'
            );
    }

    public function edit(
        Address $address
    ): Response {

        $this->authorizeAddress($address);

        return Inertia::render(
            'Store/Addresses/Edit',
            [
                'address' => $address,
            ]
        );
    }

    public function update(
        AddressRequest $request,
        Address $address,
        AddressService $service
    ) {

        $this->authorizeAddress($address);

        $service->update(
            $address,
            $request->validated()
        );

        return redirect()
            ->route('addresses.index')
            ->with(
                'success',
                'Address updated successfully.'
            );
    }

    public function destroy(
        Address $address,
        AddressService $service
    ) {

        $this->authorizeAddress($address);

        $service->delete($address);

        return redirect()
            ->route('addresses.index')
            ->with(
                'success',
                'Address deleted successfully.'
            );
    }

    public function setDefault(
        Address $address,
        AddressService $service
    ) {

        $this->authorizeAddress($address);

        $service->setDefault($address);

        return back()->with(
            'success',
            'Default address updated.'
        );
    }

    private function authorizeAddress(
        Address $address
    ): void {

        $userId = Auth::id();

        abort_if(
            $address->user_id !== $userId,
            403
        );
    }
}
