
-- إضافة بيانات تجريبية للمناطق
INSERT INTO regions (name, code, level, is_active) VALUES
('الرياض', 'RYD', 1, true),
('جدة', 'JED', 1, true),
('الدمام', 'DMM', 1, true),
('مكة المكرمة', 'MKK', 1, true),
('المدينة المنورة', 'MED', 1, true);

-- إضافة بيانات تجريبية للمتاجر
INSERT INTO stores (name, location, phone, email, category, status, description, region_id) VALUES
('فرع الرياض الرئيسي', 'شارع الملك فهد، الرياض', '0112345678', 'riyadh@company.com', 'رئيسي', 'active', 'الفرع الرئيسي في الرياض', (SELECT id FROM regions WHERE name = 'الرياض' LIMIT 1)),
('فرع جدة التجاري', 'شارع التحلية، جدة', '0122345678', 'jeddah@company.com', 'تجاري', 'active', 'فرع تجاري في جدة', (SELECT id FROM regions WHERE name = 'جدة' LIMIT 1)),
('فرع الدمام الصناعي', 'المنطقة الصناعية، الدمام', '0132345678', 'dammam@company.com', 'صناعي', 'active', 'فرع صناعي في الدمام', (SELECT id FROM regions WHERE name = 'الدمام' LIMIT 1)),
('فرع مكة المركزي', 'شارع إبراهيم الخليل، مكة', '0122345679', 'makkah@company.com', 'مركزي', 'active', 'فرع مركزي في مكة', (SELECT id FROM regions WHERE name = 'مكة المكرمة' LIMIT 1)),
('فرع المدينة الفرعي', 'شارع سيد الشهداء، المدينة', '0142345678', 'madinah@company.com', 'فرعي', 'active', 'فرع فرعي في المدينة', (SELECT id FROM regions WHERE name = 'المدينة المنورة' LIMIT 1));

-- إضافة بيانات تجريبية لخدمات الصيانة
INSERT INTO maintenance_services (name, description, category, estimated_cost, estimated_time, is_active) VALUES
('صيانة تكييف', 'خدمات صيانة وإصلاح أنظمة التكييف', 'كهربائية', 500.00, 2, true),
('صيانة سباكة', 'خدمات إصلاح التسريبات والأنابيب', 'سباكة', 300.00, 3, true),
('صيانة كهربائية', 'إصلاح الأعطال الكهربائية والإضاءة', 'كهربائية', 400.00, 2, true),
('صيانة أبواب ونوافذ', 'إصلاح وصيانة الأبواب والنوافذ', 'نجارة', 250.00, 1, true),
('صيانة عامة', 'خدمات صيانة عامة متنوعة', 'عامة', 200.00, 1, true);

-- إضافة بيانات تجريبية لطلبات الصيانة
INSERT INTO maintenance_requests (
    title, description, service_type, priority, status, scheduled_date, 
    estimated_cost, store_id, requester_name, requester_phone, requester_email
) VALUES
('إصلاح تسريب في الحمام', 'يوجد تسريب في أنبوب الماء الساخن بحمام الموظفين', 'صيانة سباكة', 'عالية', 'pending', '2024-01-15', 350.00, (SELECT id FROM stores LIMIT 1), 'أحمد محمد', '0551234567', 'ahmed@company.com'),
('عطل في وحدة التكييف', 'وحدة التكييف الرئيسية لا تعمل بشكل صحيح', 'صيانة تكييف', 'عاجلة', 'in-progress', '2024-01-16', 600.00, (SELECT id FROM stores LIMIT 1 OFFSET 1), 'سارة أحمد', '0551234568', 'sara@company.com'),
('مشكلة في الإضاءة', 'بعض المصابيح في القاعة الرئيسية لا تعمل', 'صيانة كهربائية', 'متوسطة', 'pending', '2024-01-17', 200.00, (SELECT id FROM stores LIMIT 1 OFFSET 2), 'محمد علي', '0551234569', 'mohammed@company.com'),
('إصلاح باب المدخل', 'الباب الرئيسي يحتاج إلى إصلاح المفصلات', 'صيانة أبواب ونوافذ', 'منخفضة', 'completed', '2024-01-14', 180.00, (SELECT id FROM stores LIMIT 1 OFFSET 3), 'فاطمة سالم', '0551234570', 'fatima@company.com'),
('صيانة دورية شاملة', 'فحص وصيانة دورية لجميع المرافق', 'صيانة عامة', 'متوسطة', 'pending', '2024-01-20', 800.00, (SELECT id FROM stores LIMIT 1 OFFSET 4), 'خالد حسن', '0551234571', 'khalid@company.com');

-- إضافة بيانات تجريبية للمشاريع
INSERT INTO projects (
    name, description, category, location, area, work_type, status, 
    budget, start_date, end_date, client_name, engineer_name, progress
) VALUES
('مشروع مجمع سكني الواحة', 'تطوير مجمع سكني متكامل في شمال الرياض', 'سكني', 'شمال الرياض', '15000', 'إنشاءات', 'قيد التنفيذ', 5000000.00, '2024-01-01', '2024-12-31', 'شركة الواحة للتطوير', 'م. أحمد السالم', 25),
('مشروع مركز تجاري النخيل', 'إنشاء مركز تجاري حديث في جدة', 'تجاري', 'وسط جدة', '8000', 'إنشاءات', 'جديد', 3000000.00, '2024-02-01', '2024-10-31', 'مجموعة النخيل التجارية', 'م. سارة الأحمد', 0),
('مشروع مصنع الألمنيوم', 'إنشاء مصنع لإنتاج الألمنيوم في الدمام', 'صناعي', 'المنطقة الصناعية بالدمام', '12000', 'إنشاءات', 'قيد التنفيذ', 8000000.00, '2023-10-01', '2024-08-31', 'شركة الخليج للصناعات', 'م. محمد الحسن', 60),
('مشروع فندق الإطلالة', 'بناء فندق 5 نجوم مطل على البحر', 'فندقي', 'كورنيش جدة', '5000', 'إنشاءات', 'مكتمل', 12000000.00, '2022-01-01', '2023-12-31', 'مجموعة الإطلالة الفندقية', 'م. فاطمة العلي', 100),
('مشروع مستشفى الأمل', 'إنشاء مستشفى تخصصي في الرياض', 'طبي', 'حي الملقا، الرياض', '10000', 'إنشاءات', 'قيد التنفيذ', 15000000.00, '2023-06-01', '2024-12-31', 'مؤسسة الأمل الطبية', 'م. خالد الزهراني', 40);

-- إضافة بيانات تجريبية للتنبيهات
INSERT INTO notifications (
    title, content, user_id, related_type, related_id, is_read
) VALUES
('طلب صيانة جديد', 'تم إرسال طلب صيانة جديد رقم #001', NULL, 'maintenance_request', (SELECT id FROM maintenance_requests LIMIT 1), false),
('تحديث حالة المشروع', 'تم تحديث حالة مشروع مجمع سكني الواحة', NULL, 'project', (SELECT id FROM projects LIMIT 1), false),
('انتهاء موعد الصيانة', 'انتهى موعد الصيانة المجدولة لوحدة التكييف', NULL, 'maintenance_request', (SELECT id FROM maintenance_requests LIMIT 1 OFFSET 1), true),
('مشروع جديد', 'تم إضافة مشروع جديد: مركز تجاري النخيل', NULL, 'project', (SELECT id FROM projects LIMIT 1 OFFSET 1), false),
('طلب صيانة مكتمل', 'تم إكمال طلب صيانة إصلاح باب المدخل', NULL, 'maintenance_request', (SELECT id FROM maintenance_requests LIMIT 1 OFFSET 3), true);

-- إضافة بيانات تجريبية لسجل تغيير الحالة
INSERT INTO request_status_log (
    request_id, status, note
) VALUES
((SELECT id FROM maintenance_requests LIMIT 1), 'pending', 'تم إنشاء الطلب بنجاح'),
((SELECT id FROM maintenance_requests LIMIT 1 OFFSET 1), 'in-progress', 'تم البدء في تنفيذ الطلب'),
((SELECT id FROM maintenance_requests LIMIT 1 OFFSET 2), 'pending', 'في انتظار موافقة المدير'),
((SELECT id FROM maintenance_requests LIMIT 1 OFFSET 3), 'completed', 'تم إكمال الطلب بنجاح'),
((SELECT id FROM maintenance_requests LIMIT 1 OFFSET 4), 'pending', 'تم جدولة الطلب للأسبوع القادم');
