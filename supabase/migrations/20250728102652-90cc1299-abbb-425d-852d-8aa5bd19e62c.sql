
-- إنشاء جدول المناطق
CREATE TABLE public.regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10),
    level INTEGER NOT NULL DEFAULT 1,
    parent_id UUID REFERENCES public.regions(id),
    is_active BOOLEAN DEFAULT true,
    coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء جدول المتاجر/الفروع
CREATE TABLE public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    location VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(100),
    area DECIMAL(10,2),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    opening_date DATE,
    description TEXT,
    map_url TEXT,
    region_id UUID REFERENCES public.regions(id),
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- إنشاء جدول خدمات الصيانة
CREATE TABLE public.maintenance_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    estimated_cost DECIMAL(10,2),
    estimated_time INTEGER, -- بالدقائق
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- إنشاء جدول طلبات الصيانة الرئيسي
CREATE TABLE public.maintenance_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    service_type VARCHAR(200),
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    scheduled_date DATE,
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    completion_date TIMESTAMP WITH TIME ZONE,
    store_id UUID REFERENCES public.stores(id),
    primary_service_id UUID REFERENCES public.maintenance_services(id),
    assigned_to UUID,
    requester_name VARCHAR(200),
    requester_email VARCHAR(100),
    requester_phone VARCHAR(20),
    location VARCHAR(500),
    building_type VARCHAR(100),
    issue_type VARCHAR(100),
    technical_details TEXT,
    preferred_time VARCHAR(100),
    change_log TEXT,
    attachments TEXT[], -- مصفوفة روابط المرفقات
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- إنشاء جدول المرفقات
CREATE TABLE public.attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.maintenance_requests(id),
    file_url TEXT NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    uploaded_by UUID,
    is_deleted BOOLEAN DEFAULT false
);

-- إنشاء جدول سجل تغيير الحالة
CREATE TABLE public.request_status_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.maintenance_requests(id),
    status VARCHAR(50) NOT NULL,
    note TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    changed_by UUID,
    is_deleted BOOLEAN DEFAULT false
);

-- إنشاء جدول التعليقات
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.maintenance_requests(id),
    content TEXT,
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء جدول الإشعارات
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    title VARCHAR(200),
    content TEXT,
    related_type VARCHAR(50),
    related_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء جدول أعمال الصيانة
CREATE TABLE public.maintenance_works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.maintenance_requests(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    work_type VARCHAR(100),
    quantity DECIMAL(10,2),
    price DECIMAL(10,2),
    cost DECIMAL(10,2),
    total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    start_date DATE,
    end_date DATE,
    request_date DATE,
    technician_id UUID,
    notes TEXT,
    year INTEGER,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID
);

-- إنشاء جدول المشاريع
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(500) NOT NULL,
    description TEXT,
    location VARCHAR(500),
    area VARCHAR(200),
    category VARCHAR(100),
    work_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'planning',
    progress DECIMAL(5,2) DEFAULT 0,
    budget DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    client_name VARCHAR(200),
    engineer_name VARCHAR(200),
    assigned_to UUID,
    project_number VARCHAR(100),
    order_number VARCHAR(100),
    image TEXT,
    model3d_url TEXT,
    tags TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء جدول ملفات المشاريع
CREATE TABLE public.project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id),
    name VARCHAR(500) NOT NULL,
    file_url TEXT NOT NULL,
    type VARCHAR(100),
    size BIGINT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء جدول تقدم المشاريع
CREATE TABLE public.project_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id),
    date DATE,
    overall_progress DECIMAL(5,2),
    completed_tasks INTEGER,
    total_tasks INTEGER,
    notes TEXT,
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء أرشيف طلبات الصيانة
CREATE TABLE public.maintenance_requests_archive (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    service_type VARCHAR(200),
    priority VARCHAR(50),
    status VARCHAR(50),
    scheduled_date DATE,
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    completion_date TIMESTAMP WITH TIME ZONE,
    store_id UUID,
    primary_service_id UUID,
    assigned_to UUID,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- إنشاء trigger لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- تطبيق trigger على الجداول الرئيسية
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_services_updated_at BEFORE UPDATE ON public.maintenance_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_requests_updated_at BEFORE UPDATE ON public.maintenance_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_works_updated_at BEFORE UPDATE ON public.maintenance_works
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON public.regions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إدراج بيانات أولية للمناطق
INSERT INTO public.regions (name, code, level) VALUES
('الرياض', 'RUH', 1),
('جدة', 'JED', 1),
('مكة المكرمة', 'MKK', 1),
('المدينة المنورة', 'MED', 1),
('الدمام', 'DMM', 1),
('الخبر', 'KBR', 1),
('الأحساء', 'AHS', 1),
('الطائف', 'TAF', 1),
('أبها', 'AHB', 1),
('تبوك', 'TBK', 1);

-- إدراج بيانات أولية للمتاجر
INSERT INTO public.stores (name, location, phone, region_id) VALUES
('فرع الرياض الرئيسي', 'طريق الملك فهد، الرياض', '011-1234567', (SELECT id FROM public.regions WHERE name = 'الرياض' LIMIT 1)),
('فرع جدة', 'شارع فلسطين، جدة', '012-1234567', (SELECT id FROM public.regions WHERE name = 'جدة' LIMIT 1)),
('فرع مكة', 'طريق الحرم، مكة المكرمة', '012-2345678', (SELECT id FROM public.regions WHERE name = 'مكة المكرمة' LIMIT 1)),
('فرع المدينة', 'شارع الملك عبدالعزيز، المدينة المنورة', '014-1234567', (SELECT id FROM public.regions WHERE name = 'المدينة المنورة' LIMIT 1)),
('فرع الدمام', 'طريق الخليج، الدمام', '013-1234567', (SELECT id FROM public.regions WHERE name = 'الدمام' LIMIT 1)),
('فرع الخبر', 'الكورنيش، الخبر', '013-2345678', (SELECT id FROM public.regions WHERE name = 'الخبر' LIMIT 1));

-- إدراج بيانات أولية لخدمات الصيانة
INSERT INTO public.maintenance_services (name, description, category, estimated_cost, estimated_time) VALUES
('صيانة عامة', 'صيانة عامة للمرافق والمباني', 'عامة', 500.00, 120),
('صيانة كهربائية', 'إصلاح وصيانة الأنظمة الكهربائية', 'كهربائية', 300.00, 90),
('صيانة سباكة', 'إصلاح وصيانة أنظمة السباكة', 'سباكة', 250.00, 60),
('صيانة تكييف', 'صيانة وإصلاح أنظمة التكييف', 'تكييف', 400.00, 150),
('صيانة أجهزة', 'صيانة الأجهزة الإلكترونية والمعدات', 'أجهزة', 350.00, 180),
('صيانة شبكات', 'صيانة شبكات الإنترنت والاتصالات', 'شبكات', 200.00, 90),
('صيانة أمان', 'صيانة أنظمة الأمان والحماية', 'أمان', 600.00, 120),
('صيانة طوارئ', 'خدمات الصيانة الطارئة', 'طوارئ', 800.00, 60);

-- تفعيل Row Level Security لجميع الجداول
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_status_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests_archive ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات RLS أساسية للقراءة العامة (يمكن تعديلها لاحقاً)
CREATE POLICY "Allow public read access" ON public.regions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.maintenance_services FOR SELECT USING (true);

-- سياسات للطلبات - يمكن للجميع القراءة والإدراج
CREATE POLICY "Allow public read access" ON public.maintenance_requests FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.maintenance_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.maintenance_requests FOR UPDATE USING (true);

-- سياسات للمرفقات
CREATE POLICY "Allow public read access" ON public.attachments FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.attachments FOR INSERT WITH CHECK (true);

-- سياسات لسجل الحالة
CREATE POLICY "Allow public read access" ON public.request_status_log FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.request_status_log FOR INSERT WITH CHECK (true);

-- سياسات للتعليقات
CREATE POLICY "Allow public read access" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.comments FOR INSERT WITH CHECK (true);

-- سياسات للإشعارات
CREATE POLICY "Allow public read access" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.notifications FOR INSERT WITH CHECK (true);

-- سياسات لأعمال الصيانة
CREATE POLICY "Allow public read access" ON public.maintenance_works FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.maintenance_works FOR INSERT WITH CHECK (true);

-- سياسات للمشاريع
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.projects FOR INSERT WITH CHECK (true);

-- سياسات لملفات المشاريع
CREATE POLICY "Allow public read access" ON public.project_files FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.project_files FOR INSERT WITH CHECK (true);

-- سياسات لتقدم المشاريع
CREATE POLICY "Allow public read access" ON public.project_progress FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.project_progress FOR INSERT WITH CHECK (true);

-- سياسات للأرشيف
CREATE POLICY "Allow public read access" ON public.maintenance_requests_archive FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.maintenance_requests_archive FOR INSERT WITH CHECK (true);
