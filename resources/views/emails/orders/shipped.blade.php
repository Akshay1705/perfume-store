<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Shipped | AURA</title>
</head>

<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1C1917;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;background-color:#FAF9F6;">
<tr>
<td align="center">

<table width="640" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1px solid #E7E5E4;">

    <!-- BRAND HEADER -->
    <tr>
        <td align="center" style="background-color:#1C1917;padding:40px 30px;color:#ffffff;">
            
            <div style="font-family:'Georgia',Times,serif;font-size:28px;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:#ffffff;">
                A U R A
            </div>

            <div style="margin-top:10px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#A8A29E;">
                Haute Parfumerie & Pure Essences
            </div>

        </td>
    </tr>

    <!-- STATUS BADGE & TITLE -->
    <tr>
        <td style="padding:40px 40px 20px;">

            <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#B45309;font-weight:600;margin-bottom:12px;">
                Dispatch Update
            </div>

            <h2 style="margin:0 0 16px;font-family:'Georgia',Times,serif;font-size:22px;font-weight:400;color:#1C1917;letter-spacing:-0.01em;">
                Your Order Is On Its Way
            </h2>

            <p style="margin:0 0 12px;font-size:14px;line-height:22px;color:#57534E;">
                Hello <strong>{{ $order->user->name }}</strong>,
            </p>

            <p style="margin:0;font-size:14px;line-height:22px;color:#57534E;">
                Delighted to inform you that your curated fragrances have been carefully hand-packed and dispatched from our atelier. Your parcel is now handed over to our courier partner.
            </p>

        </td>
    </tr>

    <!-- SHIPMENT STATUS BANNER -->
    <tr>
        <td style="padding:0 40px 25px;">

            <div style="padding:20px;background-color:#FAF9F6;border-left:3px solid #1C1917;border-right:1px solid #E7E5E4;border-top:1px solid #E7E5E4;border-bottom:1px solid #E7E5E4;">

                <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#78716C;margin-bottom:4px;">
                    Current Parcel Status
                </div>

                <div style="font-family:'Georgia',Times,serif;font-size:16px;color:#1C1917;font-weight:400;">
                    In Transit &bull; Dispatched via Express Courier
                </div>

            </div>

        </td>
    </tr>

    <!-- SHIPMENT DETAILS TABLE -->
    <tr>
        <td style="padding:0 40px 35px;">

            <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#1C1917;font-weight:600;margin-bottom:12px;">
                Shipment Details
            </div>

            <table width="100%" cellpadding="14" cellspacing="0" style="border-collapse:collapse;border:1px solid #E7E5E4;background-color:#ffffff;">

                <tr style="border-bottom:1px solid #E7E5E4;">
                    <td width="40%" style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Order Reference</strong></td>
                    <td style="font-family:Consolas,Monaco,monospace;font-size:13px;color:#1C1917;">#{{ $order->id }}</td>
                </tr>

                <tr style="border-bottom:1px solid #E7E5E4;">
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Dispatched On</strong></td>
                    <td style="font-size:13px;color:#1C1917;">{{ now()->format('d M Y') }}</td>
                </tr>

                <tr style="border-bottom:1px solid #E7E5E4;">
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Expected Arrival</strong></td>
                    <td style="font-size:13px;color:#1C1917;font-weight:600;">
                        {{ $estimatedDelivery->format('d M Y') }}
                    </td>
                </tr>

                <tr>
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Fulfillment Status</strong></td>
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;font-weight:700;">
                        Shipped
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- FOOTER -->
    <tr>
        <td align="center" style="background-color:#1C1917;color:#A8A29E;padding:35px 30px;">

            <div style="font-family:'Georgia',Times,serif;font-size:14px;color:#ffffff;letter-spacing:0.1em;text-transform:uppercase;">
                AURA Concierge
            </div>

            <div style="margin-top:8px;font-size:12px;">
                Have questions about your delivery? <br>
                Contact us at <a href="mailto:support@auraparfum.com" style="color:#D6D3D1;text-decoration:underline;">support@auraparfum.com</a>
            </div>

            <div style="margin-top:20px;padding-top:20px;border-top:1px solid #292524;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#78716C;">
                &copy; {{ date('Y') }} AURA Luxury Parfums. All Rights Reserved.
            </div>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>

</html>