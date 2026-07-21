<?php

namespace App\Mail\Orders;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Carbon\CarbonInterface;

class OrderShippedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public CarbonInterface $estimatedDelivery;

    /**
     * Create a new message instance.
     */
    public function __construct(public Order $order)
    {
        $this->order->load([
            'user',
            'address',
            'items.variant.product.brand',
            'discount',
        ]);

        $this->estimatedDelivery = now()->addDays(7);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Order Has Been Shipped - AURA',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.orders.shipped',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
