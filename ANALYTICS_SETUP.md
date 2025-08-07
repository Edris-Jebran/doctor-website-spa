# Google Analytics 4 Setup Guide

This guide will help you set up comprehensive analytics tracking for Dr. Ehsan Medical Clinic website.

## 📊 What Analytics Will Track

### **Visitor Information:**
- ✅ **Unique visitors** and page views
- ✅ **Geographic location** (country, city)
- ✅ **Device type** (mobile, desktop, tablet)
- ✅ **Browser and operating system**
- ✅ **Screen resolution**
- ✅ **Time on page** and session duration

### **User Behavior:**
- ✅ **Page scroll depth** (25%, 50%, 75%, 100%)
- ✅ **Language preferences** (English/Farsi)
- ✅ **Most visited sections**
- ✅ **Button clicks** and interactions
- ✅ **Contact method preferences**

### **Business Metrics:**
- ✅ **Appointment button clicks** (conversions)
- ✅ **Phone call tracking**
- ✅ **Email clicks**
- ✅ **WhatsApp interactions**
- ✅ **Map interactions**

### **Performance:**
- ✅ **Page load times**
- ✅ **Error tracking**
- ✅ **User engagement metrics**

## 🚀 Setup Instructions

### Step 1: Create Google Analytics 4 Account

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Click "Start measuring"**
3. **Create account**:
   - Account name: "Dr. Ehsan Medical Clinic"
   - Data sharing settings: Choose your preferences
4. **Create property**:
   - Property name: "Dr. Ehsan Medical Clinic Website"
   - Reporting time zone: Asia/Kabul
   - Currency: Afghan Afghani (AFN)
5. **Choose business objectives**: Select "Generate leads"
6. **Create data stream**:
   - Platform: Web
   - Website URL: `https://edris-jebran.github.io/doctor-website-spa`
   - Stream name: "Doctor Website"

### Step 2: Get Your Tracking ID

1. **Copy the Measurement ID** (starts with "G-")
2. **Replace the placeholder** in these files:
   - `public/index.html` (line with `G-XXXXXXXXXX`)
   - `src/utils/analytics.js` (line with `GA_TRACKING_ID`)

### Step 3: Deploy the Changes

```bash
git add .
git commit -m "Add Google Analytics 4 tracking"
git push
```

## 📈 Analytics Dashboard Setup

### **Custom Reports to Create:**

#### 1. **Visitor Overview**
- Unique visitors per day/week/month
- Geographic distribution
- Device breakdown
- Language preferences

#### 2. **Engagement Metrics**
- Most popular sections
- Scroll depth analysis
- Time on page
- Bounce rate

#### 3. **Conversion Tracking**
- Appointment button clicks
- Contact method preferences
- Phone call tracking
- Email interactions

#### 4. **Performance Monitoring**
- Page load times
- Error rates
- User experience metrics

## 🎯 Key Metrics to Monitor

### **Daily/Weekly:**
- **Unique visitors**: Track growth over time
- **Page views**: Understand content popularity
- **Geographic data**: Know where your patients are from
- **Device usage**: Optimize for most used devices

### **Monthly:**
- **Conversion rate**: Appointment button clicks
- **Contact preferences**: Phone vs Email vs WhatsApp
- **Language usage**: English vs Farsi preference
- **Performance trends**: Page load speed improvements

### **Quarterly:**
- **User behavior patterns**: Most visited sections
- **Engagement depth**: How far users scroll
- **Geographic expansion**: New regions accessing the site
- **Technology trends**: Browser/device changes

## 🔧 Advanced Features

### **Custom Events Tracked:**

1. **Contact Interactions:**
   - Phone call clicks
   - Email clicks
   - WhatsApp clicks
   - Contact form submissions

2. **User Behavior:**
   - Language changes
   - Scroll depth (25%, 50%, 75%, 100%)
   - Time on page
   - Map interactions

3. **Business Goals:**
   - Appointment button clicks
   - Service section views
   - About section engagement

4. **Technical Metrics:**
   - Page load performance
   - Error tracking
   - Device/browser information

### **Privacy Compliance:**

The analytics setup respects user privacy:
- ✅ **No personal information** collected
- ✅ **GDPR compliant** tracking
- ✅ **User consent** respected
- ✅ **Anonymized data** only

## 📊 Sample Reports

### **Visitor Demographics:**
```
Country: Afghanistan (80%), Pakistan (10%), Others (10%)
City: Kabul (60%), Other cities (40%)
Device: Mobile (70%), Desktop (30%)
Language: Farsi (60%), English (40%)
```

### **Engagement Metrics:**
```
Average time on page: 3 minutes
Most popular section: Services (40%)
Contact method: Phone (50%), WhatsApp (30%), Email (20%)
Scroll depth: 75% average
```

### **Conversion Tracking:**
```
Appointment clicks: 15% of visitors
Contact form submissions: 8% of visitors
Phone calls: 12% of visitors
```

## 🛠️ Troubleshooting

### **Common Issues:**

1. **No data appearing:**
   - Check if tracking ID is correct
   - Verify website is live
   - Wait 24-48 hours for data

2. **Incomplete tracking:**
   - Check browser console for errors
   - Verify analytics script is loading
   - Test with Google Analytics Debugger

3. **Privacy concerns:**
   - Analytics only tracks anonymous data
   - No personal information collected
   - Users can opt-out via browser settings

## 📱 Mobile Analytics

### **Mobile-Specific Tracking:**
- ✅ **Touch interactions** tracked
- ✅ **Mobile-specific events** (swipe, tap)
- ✅ **App performance** on mobile devices
- ✅ **Mobile user behavior** patterns

### **Mobile Optimization Insights:**
- **Most used sections** on mobile
- **Contact method preferences** on mobile
- **Performance issues** on mobile devices
- **User experience** improvements needed

## 🎯 Business Intelligence

### **Key Insights to Extract:**

1. **Patient Behavior:**
   - When do people visit most?
   - Which services are most popular?
   - What contact methods do they prefer?

2. **Geographic Data:**
   - Where are your patients located?
   - Which areas need more outreach?
   - Local vs international patients

3. **Technology Trends:**
   - Mobile vs desktop usage
   - Browser preferences
   - Performance requirements

4. **Content Performance:**
   - Most engaging sections
   - Areas needing improvement
   - User journey optimization

## 📈 Growth Tracking

### **Monthly Goals:**
- **Increase unique visitors** by 20%
- **Improve conversion rate** to 20%
- **Reduce bounce rate** to 40%
- **Increase time on page** to 4 minutes

### **Success Metrics:**
- **Appointment requests** increase
- **Contact interactions** growth
- **Geographic expansion**
- **User engagement** improvement

---

**Your website is now fully equipped with comprehensive analytics tracking!** 🚀

The analytics will help you understand your patients better and optimize the website for maximum effectiveness.
