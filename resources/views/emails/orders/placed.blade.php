<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation | AURA</title>
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

    <!-- GREETING & CONFIRMATION NOTE -->
    <tr>
        <td style="padding:40px 40px 20px;">

            <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#B45309;font-weight:600;margin-bottom:12px;">
                Order Confirmed
            </div>

            <h2 style="margin:0 0 16px;font-family:'Georgia',Times,serif;font-size:22px;font-weight:400;color:#1C1917;letter-spacing:-0.01em;">
                Hello {{ $order->user->name }},
            </h2>

            <p style="margin:0 0 12px;font-size:14px;line-height:22px;color:#57534E;">
                Thank you for choosing <strong>AURA</strong>. We have received your order and our atelier is currently preparing your fragrances for shipment.
            </p>

            <p style="margin:0;font-size:14px;line-height:22px;color:#78716C;">
                You will receive another notification with tracking information as soon as your package leaves our distribution house.
            </p>

        </td>
    </tr>

    <!-- METADATA TABLE -->
    <tr>
        <td style="padding:10px 40px 30px;">

            <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse:collapse;border:1px solid #E7E5E4;background-color:#FAF9F6;">

                <tr style="border-bottom:1px solid #E7E5E4;">
                    <td width="40%" style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Order Identifier</strong></td>
                    <td style="font-family:Consolas,Monaco,monospace;font-size:13px;color:#1C1917;">#{{ $order->id }}</td>
                </tr>

                <tr style="border-bottom:1px solid #E7E5E4;">
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Date Placed</strong></td>
                    <td style="font-size:13px;color:#1C1917;">{{ $order->placed_at->format('d M Y') }}</td>
                </tr>

                <tr>
                    <td style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#78716C;"><strong>Estimated Dispatch</strong></td>
                    <td style="font-size:13px;color:#1C1917;">
                        Before {{ $estimatedDelivery->format('d M Y') }}
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- SHIPPING ADDRESS -->
    <tr>
        <td style="padding:0 40px 30px;">

            <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#1C1917;font-weight:600;margin-bottom:10px;">
                Shipping Destination
            </div>

            <div style="padding:20px;border:1px solid #E7E5E4;background-color:#ffffff;font-size:13px;line-height:22px;color:#44403C;">

                <strong style="color:#1C1917;">{{ $order->address->full_name }}</strong><br>

                {{ $order->address->address_line_1 }}<br>

                @if($order->address->address_line_2)
                    {{ $order->address->address_line_2 }}<br>
                @endif

                {{ $order->address->city }}, {{ $order->address->state }} — {{ $order->address->postal_code }}<br>

                {{ $order->address->country }}<br>

                <span style="color:#78716C;">Phone: {{ $order->address->phone }}</span>

            </div>

        </td>
    </tr>

    <!-- PRODUCTS TABLE -->
    <tr>
        <td style="padding:0 40px 30px;">

            <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#1C1917;font-weight:600;margin-bottom:12px;">
                Ordered Fragrances
            </div>

            <table width="100%" cellpadding="14" cellspacing="0" style="border-collapse:collapse;border:1px solid #E7E5E4;">

                <thead>
                    <tr style="background-color:#1C1917;color:#ffffff;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">
                        <th align="left" style="font-weight:500;">Item</th>
                        <th align="center" style="font-weight:500;">Qty</th>
                        <th align="right" style="font-weight:500;">Unit</th>
                        <th align="right" style="font-weight:500;">Amount</th>
                    </tr>
                </thead>

                <tbody style="font-size:13px;">

                @foreach($order->items as $item)

                    <tr style="border-bottom:1px solid #E7E5E4;">

                        <td>

                            <div style="font-family:'Georgia',Times,serif;font-weight:400;color:#1C1917;font-size:14px;">
                                {{ $item->variant->product->name }}
                            </div>

                            <div style="font-size:11px;color:#78716C;margin-top:2px;letter-spacing:0.05em;">
                                {{ $item->variant->product->brand->name }}
                                @if($item->variant->volume)
                                    &bull; {{ $item->variant->volume }}
                                @endif
                            </div>

                        </td>

                        <td align="center" style="color:#57534E;">
                            {{ $item->quantity }}
                        </td>

                        <td align="right" style="font-family:Consolas,Monaco,monospace;color:#57534E;">
                            &#8377;{{ number_format($item->unit_price,2) }}
                        </td>

                        <td align="right" style="font-family:Consolas,Monaco,monospace;color:#1C1917;font-weight:600;">
                            &#8377;{{ number_format($item->quantity * $item->unit_price, 2) }}
                        </td>

                    </tr>

                @endforeach

                </tbody>

            </table>

        </td>
    </tr>

    <!-- TOTALS -->
    <tr>
        <td style="padding:0 40px 30px;">

            <table align="right" width="280" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:13px;">

                <tr>
                    <td style="color:#78716C;">Subtotal</td>
                    <td align="right" style="font-family:Consolas,Monaco,monospace;color:#1C1917;">
                        &#8377;{{ number_format($order->subtotal,2) }}
                    </td>
                </tr>

                @if($order->discount_amount > 0)
                <tr>
                    <td style="color:#B45309;">Discount Applied</td>
                    <td align="right" style="font-family:Consolas,Monaco,monospace;color:#B45309;">
                        - &#8377;{{ number_format($order->discount_amount,2) }}
                    </td>
                </tr>
                @endif

                <tr>
                    <td style="color:#78716C;">Complimentary Delivery</td>
                    <td align="right" style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;font-weight:600;">
                        FREE
                    </td>
                </tr>

                <tr style="border-top:1px solid #1C1917;">
                    <td style="padding-top:12px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;color:#1C1917;">
                        Grand Total
                    </td>
                    <td align="right" style="padding-top:12px;font-family:Consolas,Monaco,monospace;font-size:16px;font-weight:700;color:#1C1917;">
                        &#8377;{{ number_format($order->total,2) }}
                    </td>
                </tr>

            </table>

            <div style="clear:both;"></div>

        </td>
    </tr>

    <!-- POLICY NOTICE -->
    <tr>
        <td style="padding:0 40px 35px;">

            <div style="padding:16px 20px;background-color:#FAF9F6;border-left:3px solid #B45309;">

                <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;color:#B45309;margin-bottom:4px;">
                    Returns & Guarantee
                </div>

                <p style="margin:0;font-size:12px;line-height:20px;color:#57534E;">
                    Unopened fragrances in original packaging are eligible for return or exchange within <strong>14 days</strong> of confirmed delivery.
                </p>

            </div>

        </td>
    </tr>

    <!-- FOOTER -->
    <tr>
        <td align="center" style="background-color:#1C1917;color:#A8A29E;padding:35px 30px;">

            <div style="font-family:'Georgia',Times,serif;font-size:14px;color:#ffffff;letter-spacing:0.1em;text-transform:uppercase;">
                AURA Concierge
            </div>

            <div style="margin-top:8px;font-size:12px;">
                <a href="mailto:support@auraparfum.com" style="color:#D6D3D1;text-decoration:underline;">support@auraparfum.com</a>
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