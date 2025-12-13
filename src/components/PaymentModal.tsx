import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wallet, Check, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  activityTitle: string;
}

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'momo', label: 'MoMo', icon: Wallet, color: 'text-pink-500' },
  { id: 'zalopay', label: 'ZaloPay', icon: Wallet, color: 'text-blue-500' },
  { id: 'paypal', label: 'PayPal', icon: Wallet, color: 'text-blue-600' },
];

const PaymentModal = ({ open, onOpenChange, amount, activityTitle }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onOpenChange(false);
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your booking for ${activityTitle} has been confirmed. Check your email for details.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Order Summary */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-2">
            <h4 className="font-medium">Order Summary</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{activityTitle}</span>
              <span>${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service fee</span>
              <span>${(amount * 0.05).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${(amount * 1.05).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Payment Method</Label>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-accent' 
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                  <method.icon className={`h-6 w-6 ${method.color || 'text-foreground'}`} />
                  <span className="font-medium flex-1">{method.label}</span>
                  {selectedMethod === method.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Card Details Form */}
          {selectedMethod === 'card' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>
          )}

          {/* E-wallet redirect notice */}
          {selectedMethod !== 'card' && (
            <div className="bg-accent rounded-xl p-4 text-sm text-accent-foreground animate-fade-in">
              You will be redirected to {paymentMethods.find(m => m.id === selectedMethod)?.label} to complete your payment securely.
            </div>
          )}

          {/* Security Note */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full gap-2" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>Pay ${(amount * 1.05).toFixed(2)}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
