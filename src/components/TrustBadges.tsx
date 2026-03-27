import { Truck, ShieldCheck, MapPin } from "lucide-react";

interface TrustBadgesProps {
  shippingEstimate: string;
  warrantyInfo: string;
}

export default function TrustBadges({ shippingEstimate, warrantyInfo }: TrustBadgesProps) {
  return (
    <div className="space-y-3">
      {/* Shipping Options */}
      <div className="border border-light-300 rounded-lg p-4">
        <h3 className="text-body-medium text-dark-900 mb-3">Shipping options</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-dark-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-caption text-dark-900">{shippingEstimate}</p>
              <p className="text-footnote text-dark-500 mt-0.5">Origin</p>
              <p className="text-footnote text-dark-500">
                Can be returned &amp; sold by{" "}
                <span className="text-dark-900 underline cursor-pointer">Comparison&nbsp;</span>
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 shrink-0">
              <MapPin className="w-4 h-4 text-dark-500" aria-hidden="true" />
              <span className="text-footnote text-dark-500">United States of America</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty */}
      <div className="border border-light-300 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-green shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-caption text-dark-900">{warrantyInfo}</p>
            <p className="text-footnote text-dark-500 mt-0.5">
              Quality tested and verified by our team of technicians
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
