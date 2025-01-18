import React from 'react';

interface ShippingAddressFormProps {
  shippingAddress: { name: string; address: string; city: string; zip: string };
  setShippingAddress: React.Dispatch<React.SetStateAction<{ name: string; address: string; city: string; zip: string }>>;
  onNext: () => void;
  onBack: () => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ shippingAddress, setShippingAddress, onNext, onBack }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <h2 className="text-lg font-medium">Shipping Address</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={shippingAddress.name}
          onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          id="zip"
          value={shippingAddress.zip}
          onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-300 text-black py-2 px-4 rounded-md">Back</button>
        <button type="submit" className="bg-[#2A254B] text-white py-2 px-4 rounded-md">Next</button>
      </div>
    </form>
  );
};

export default ShippingAddressForm;
