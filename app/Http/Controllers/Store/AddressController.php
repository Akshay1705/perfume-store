<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\AddressRequest;
use App\Models\Address;
use App\Models\User;
use App\Services\AddressService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AddressController extends Controller
{
    /**
     * Display a listing of addresses.
     * 
     * @return Response
     */
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        $addresses = $user->addresses()->latest()->get();

        return Inertia::render(
            'Store/Addresses/Index',
            [
                'addresses' => $addresses,
            ]
        );
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render(
            'Store/Addresses/Create'
        );
    }

    /**
     * @param AddressRequest $request
     * @param AddressService $service
     * 
     * @return RedirectResponse
     */
    public function store(AddressRequest $request, AddressService $service): RedirectResponse
    {
        $user = Auth::user();
        $service->create($user, $request->validated());

        return redirect()
            ->route('addresses.index')
            ->with(
                'success',
                'Address added successfully.'
            );
    }

    /**
     * @param Address $address
     * 
     * @return Response
     */
    public function edit(Address $address): Response
    {
        $this->authorizeAddress($address);

        return Inertia::render(
            'Store/Addresses/Edit',
            [
                'address' => $address,
            ]
        );
    }

    /**
     * @param Address $address
     * @param AddressService $service
     * @param AddressRequest $request
     * 
     * @return RedirectResponse
     */
    public function update(AddressRequest $request, Address $address, AddressService $service): RedirectResponse
    {
        $this->authorizeAddress($address);
        $service->update($address, $request->validated());

        return redirect()
            ->route('addresses.index')
            ->with(
                'success',
                'Address updated successfully.'
            );
    }

    /**
     * @param Address $address
     * @param  AddressService $service
     * 
     * @return RedirectResponse
     */
    public function destroy(Address $address, AddressService $service): RedirectResponse
    {
        $this->authorizeAddress($address);
        $service->delete($address);

        return redirect()
            ->route('addresses.index')
            ->with(
                'success',
                'Address deleted successfully.'
            );
    }

    /**
     * @param Address $address
     * @param  AddressService $service
     * 
     * @return RedirectResponse
     */
    public function setDefault(Address $address, AddressService $service): RedirectResponse
    {
        $this->authorizeAddress($address);
        $service->setDefault($address);

        return back()->with(
            'success',
            'Default address updated.'
        );
    }

    /**
     * Authorize the address belongs to the authenticated user.
     *
     * @param Address $address
     *
     * @return void
     */
    private function authorizeAddress(Address $address): void 
    {
        $userId = Auth::id();
        abort_if($address->user_id !== $userId, 403);
    }
}
