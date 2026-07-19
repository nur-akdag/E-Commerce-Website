🛒 E-Commerce Website

A modern, fully responsive e-commerce web application providing a seamless shopping experience from product exploration to secure checkout simulation.
[Switch to Turkish Version (#türkçe-dokümantasyon) 🇹🇷]

🇬🇧 English Documentation
This repository contains a dynamic, production-ready frontend interface connected to an external RESTful API, utilizing global state micro-management and a mobile-first UI philosophy.

🚀 Features & Objectives

* User Authentication: Secure login and registration flows backed by strict client-side protected routing tokens.
* Product Catalog: Deep product indexing featuring live filtering combinations, criteria sorting, and localized query searches.
* Dynamic Shopping Cart: Real-time state synchronization for additive counts, custom unit adjustments, and product drops.
* Checkout & Payment Processing: Multi-step verification wizards linking user configurations directly to payment layout simulations.
* Order Tracking Hub: Retains historic ledger records, specific shipping receipts, and encrypted profile structures.
* Responsive Blueprint: Built around strict CSS grids and flex layouts, delivering performance optimized for viewports from mobile screens up to desktop monitors.

🛠️ Tech Stack

* Core Architecture: React.js, Redux Toolkit, React Router DOM
* Design & Layout: Tailwind CSS, Swiper (React Slider Component)
* Data Flow & Integrations: Axios (HTTP Framework), Workintech E-Commerce REST API
* Form & Event Control: React Hook Form, React Toastify (System Notifications)
* Visual Assets: Lucide-React Icon Engines


🇹🇷 Türkçe Dokümantasyon 

Bu proje; harici bir RESTful API mimarisine bağlanan, global durum yönetimini (global state) ve kullanıcı deneyimi odaklı ("mobile-first") arayüz tasarımlarını pekiştirmek amacıyla geliştirilmiş modern bir e-ticaret platformudur.

🚀 Özellikler ve Hedefler

* Kullanıcı Kimlik Doğrulaması: Korumalı yönlendirme katmanları (protected routes) eşliğinde güvenli kayıt olma, giriş yapma ve oturum kontrolü.
* Ürün Kataloğu Kontrolü: Gelişmiş kategori filtreleri, fiyat/puan bazlı sıralama motorları ve anlık metin arama optimizasyonları.
* Dinamik Alışveriş Sepeti: Redux altyapısı ile beslenen; sepet içi miktar artırımı, azaltımı ve dinamik tutar güncellemelerini anlık yansıtan sepet modülü.
* Ödeme ve Sipariş Yönetimi: Adım adım kurgulanmış adres/kart doğrulama sihirbazı ve simüle edilmiş güvenli ödeme geçidi entegrasyonu.
* Kişisel Sipariş Geçmişi: Kullanıcıların geçmiş dönem satın alımlarını, sipariş detaylarını ve fatura adreslerini takip edebileceği panel arayüzü.
* Esnek Arayüz Tasarımı (Duyarlı): Mobil cihazlardan geniş masaüstü ekranlara kadar tüm çözünürlüklerde mükemmel ölçeklenen esnek grid/flex yapısı.

🛠️ Kullanılan Teknolojiler

* Ana Mimari: React.js, Redux Toolkit, React Router DOM
* Arayüz Tasarımı: Tailwind CSS, Swiper (Kaydırıcı Bileşeni)
* Veri İletişimi: Axios (HTTP İstemcisi), Workintech E-Ticaret REST API
* Form ve Bildirim Yönetimi: React Hook Form, React Toastify (Anlık Bildirimler)
* Grafik Bileşenleri: Lucide-React İkon Setleri

📥 Installation & Running / Kurulum ve Çalıştırma
* Fork the project and clone it to your computer. / Projeyi forklayın ve bilgisayarınıza clone edin.
* Open the project using your code editor (e.g., VS Code or WebStorm). / Projeyi kod editörünüzü kullanarak açın.
* Install the necessary project dependencies and launch the application. / İlgili proje bağımlılıklarını kurup uygulamayı başlatın.

Bash
# Install dependencies / Bağımlılıkları yükleyin
npm install

# Start local server / Yerel sunucuyu başlatın
npm run dev

🌐 Live Deployment & GitHub Actions / Canlı Dağıtım

The source infrastructure incorporates continuous automated deployment setups triggered on primary repository updates.

Bu projenin kaynak kodları, ana geliştirme branch'i güncellendiğinde otomatik derleme süreçlerini tetikleyen CI/CD hatlarına sahiptir:
Hosting Engine: Live platform services are powered through Vercel serverless delivery architectures.
Source Pipeline: Code synchronizations, asset integrity validations, and target deployments are managed securely directly via your custom GitHub Repository tabs.