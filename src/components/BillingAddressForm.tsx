import React from 'react';

interface BillingAddressFormProps {
  billingAddress: { name: string; address: string; city: string; zip: string };
  setBillingAddress: React.Dispatch<React.SetStateAction<{ name: string; address: string; city: string; zip: string }>>;
  onNext: () => void;
}

const BillingAddressForm: React.FC<BillingAddressFormProps> = ({ billingAddress, setBillingAddress, onNext }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <h2 className="text-lg font-medium">Billing Address</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={billingAddress.name}
          onChange={(e) => setBillingAddress({ ...billingAddress, name: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          value={billingAddress.address}
          onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          value={billingAddress.city}
          onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          id="zip"
          value={billingAddress.zip}
          onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button type="submit" className="w-full bg-[#2A254B] text-white py-2 rounded-md">Next</button>
    </form>
  );
};

export default BillingAddressForm;
