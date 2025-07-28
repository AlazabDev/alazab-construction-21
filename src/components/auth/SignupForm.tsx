
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuthOperations } from '@/hooks/useAuth';
import AuthCard from './AuthCard';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthOperations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمة المرور وتأكيد كلمة المرور غير متطابقتين",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "كلمة المرور ضعيفة",
        description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.fullName,
          phone: formData.phone,
        }
      );

      if (error) {
        let errorMessage = 'حدث خطأ في إنشاء الحساب';
        
        if (error.message.includes('already registered')) {
          errorMessage = 'البريد الإلكتروني مسجل مسبقاً';
        } else if (error.message.includes('weak password')) {
          errorMessage = 'كلمة المرور ضعيفة';
        }

        toast({
          title: "خطأ في إنشاء الحساب",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="إنشاء حساب جديد">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">الاسم الكامل</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="text-right"
            placeholder="أدخل اسمك الكامل"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="text-right"
            dir="ltr"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="text-right"
            dir="ltr"
            placeholder="05xxxxxxxx"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="text-right"
            dir="ltr"
            placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="text-right"
            dir="ltr"
            placeholder="أعد إدخال كلمة المرور"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-construction-primary hover:bg-construction-secondary text-white"
          disabled={loading}
        >
          {loading ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">لديك حساب بالفعل؟ </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-construction-primary hover:underline font-medium"
          >
            تسجيل الدخول
          </button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignupForm;
