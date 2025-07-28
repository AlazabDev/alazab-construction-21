
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuthOperations } from '@/hooks/useAuth';
import AuthCard from './AuthCard';

interface ResetPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuthOperations();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        let errorMessage = 'حدث خطأ في إرسال رابط الاستعادة';
        
        if (error.message.includes('not found')) {
          errorMessage = 'البريد الإلكتروني غير موجود';
        }

        toast({
          title: "خطأ في إرسال رابط الاستعادة",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم الإرسال بنجاح",
          description: "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء إرسال رابط الاستعادة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="استعادة كلمة المرور">
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-right"
            dir="ltr"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-construction-primary hover:bg-construction-secondary text-white"
          disabled={loading}
        >
          {loading ? "جارٍ الإرسال..." : "إرسال رابط الاستعادة"}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-construction-primary hover:underline"
          >
            العودة إلى تسجيل الدخول
          </button>
        </div>
      </form>
    </AuthCard>
  );
};

export default ResetPasswordForm;
