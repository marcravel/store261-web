'use client';

import { generateWhatsAppLink, generateMessengerLink } from '@/lib/config';

interface ContactButtonsProps {
  productName: string;
  className?: string;
}

export default function ContactButtons({ productName, className = '' }: ContactButtonsProps) {
  const whatsappUrl = generateWhatsAppLink(productName);
  const messengerUrl = generateMessengerLink(productName);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all text-sm min-h-[48px]"
        >
          {/* WhatsApp icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.588 1.45 5.621 1.452 5.4 0 9.794-4.402 9.797-9.814.001-2.621-1.013-5.086-2.856-6.93C17.362 2.019 14.9 1.002 12.274 1c-5.402 0-9.803 4.403-9.806 9.82-.001 2.049.535 4.053 1.554 5.823l-.99 3.616 3.714-.974zM16.94 13.9c-.27-.135-1.597-.787-1.845-.877-.248-.09-.427-.135-.607.135-.18.27-.697.877-.855 1.057-.157.18-.315.202-.585.067-1.631-.818-2.698-1.427-3.765-3.257-.282-.486-.067-.743.067-.876.12-.12.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.068-.135-.607-1.463-.832-2.003-.22-.527-.46-.455-.63-.464-.162-.008-.347-.009-.53-.009-.18 0-.473.068-.72.337-.247.27-.945.922-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.074.645.278 1.148.445 1.539.57.648.206 1.238.177 1.704.108.52-.078 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
          </svg>
          <span>Commander sur WhatsApp</span>
        </a>

        {/* Messenger CTA */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0084FF] hover:bg-[#0073de] active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all text-sm min-h-[48px]"
        >
          {/* Messenger icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.742 6.619 4.47 8.784V24l4.008-2.223a12.83 12.83 0 003.522.489c6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.293 14.887l-3.08-3.284-6.01 3.284 6.597-7.009 3.12 3.284 5.97-3.284-6.597 7.009z" />
          </svg>
          <span>Contacter sur Messenger</span>
        </a>
      </div>

      <p className="text-xs text-neutral-500 text-center font-medium">
        🔒 Aucun paiement en ligne requis. Toutes les transactions s&apos;effectuent en direct avec le vendeur.
      </p>
    </div>
  );
}
