import Script from 'next/script';

const GoogleAnalytics = () => {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        return (
            <>
                <Script
                    strategy='afterInteractive'
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                />

                <Script id='google__analytics' strategy='afterInteractive'>
                    {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
                </Script>
            </>
        );
    }
};

export default GoogleAnalytics;