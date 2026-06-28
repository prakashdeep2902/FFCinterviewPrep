# AI Screening Interview Preparation (React / Next.js / Frontend)

## 1. Tell me about yourself

### Answer

Hi, I'm **Prakash Deep Sharma**, a Full-Stack Software Engineer with over **3 years of experience** building scalable web applications using **React, Next.js, Node.js, TypeScript, and AWS**.

Currently, I'm working at **Document IT LLC**, where I build AI-powered applications and scalable backend systems. I've worked on integrating Google Gemini, improving API performance, migrating JavaScript codebases to TypeScript, and building production-ready applications.

Previously, I worked at **NoBroker**, where I developed backend services for ad serving and user verification systems.

I enjoy solving complex problems, optimizing application performance, and building responsive user experiences. Recently, I've also been working on AI-powered applications using LLMs and LangGraph.

I'm excited about this opportunity because it aligns with my experience in React, Next.js, and scalable frontend development.

---

# 2. Explain your Automatic Job Apply Agent

### Answer

One of my favorite projects is an AI-powered Automatic Job Apply Agent.

The purpose of the project is to automate the entire job application process.

The workflow is:

- User provides preferences
- Agent searches multiple job portals
- LLM analyzes job descriptions
- Resume is matched against the JD
- Jobs are ranked
- Customized cover letter is generated
- Browser automation fills the application
- Application gets submitted automatically

### Technologies

- JavaScript
- Node.js
- LangGraph
- Playwright
- LLM
- REST APIs

### Challenges

Different websites have different application flows.

I solved this by implementing:

- Retry logic
- State management
- Dynamic selectors
- Error recovery

---

# 3. Explain your HCM Project

### Answer

The HCM project is a Human Capital Management system used by organizations to manage employee information, attendance, leave, payroll integration, recruitment, and performance management.

I worked primarily on the React frontend and Node.js backend.

My responsibilities included:

- Building reusable React components
- Employee Management
- Leave Management
- Role-Based Access Control
- API Integration
- Responsive UI

One challenge was implementing role-based permissions where Admin, HR, and Employees had different levels of access.

---

# 4. How did you implement multilingual support?

### Answer

We implemented multilingual support using **react-i18next**.

Instead of hardcoding strings inside React components, we stored translations in JSON files.

Example:

```
locales/

    en/

        employee.json

        login.json

    hi/

        employee.json

        login.json
```

Inside components we used

```javascript
const { t } = useTranslation();

<h1>{t("employee.name")}</h1>;
```

When users selected Hindi,

```
i18n.changeLanguage("hi")
```

The application automatically loaded the Hindi translation file.

The selected language was stored in localStorage so that it persisted after refresh.

---

# 5. Challenge while translating English to Hindi

### Answer

One challenge was that direct English-to-Hindi translation didn't always make sense.

Business terms like

- Dashboard
- Payroll
- Leave Balance

were more commonly understood in English.

We worked with business stakeholders to decide which terms should remain in English and which should be translated.

Another challenge was that Hindi text is longer than English, which caused layout issues.

We solved this by:

- Using Flexbox
- Avoiding fixed-width buttons
- Making components responsive

---

# 6. How do you structure i18next?

### Folder Structure

```
src/

   i18n/

      locales/

           en/

              login.json

              employee.json

           hi/

              login.json

              employee.json

      index.js
```

Workflow

```
User changes language

↓

i18n.changeLanguage()

↓

Load JSON

↓

t("save")

↓

UI Updates Automatically
```

Benefits

- Easy maintenance
- Feature-wise organization
- Easy to add new languages

---

# 7. How do you ensure Accessibility?

### Answer

I follow WCAG guidelines.

I ensure:

- Semantic HTML
- Keyboard Navigation
- Focus Management
- Proper Labels
- Alt Text
- Color Contrast
- Screen Reader Support
- ARIA Attributes
- Accessibility Testing

### Keyboard Navigation

Users should be able to

- Tab
- Shift + Tab
- Enter
- Space
- Escape

without using a mouse.

For custom components

```jsx
<div
tabIndex={0}
role="button"
onKeyDown={handleKey}
>
```

---

# 8. How do you optimize your application for slow mobile internet?

### Answer

When optimizing applications for slow mobile networks, I focus on reducing network requests and minimizing bundle size.

Techniques:

- Code Splitting
- Lazy Loading
- Dynamic Import
- Image Compression
- WebP
- Browser Cache
- CDN
- Gzip/Brotli Compression
- React Query Cache
- Debouncing
- Tree Shaking
- Minification
- Pagination
- Infinite Scrolling
- Skeleton Loading

This significantly improves page load time and user experience.

---

# 9. How do you integrate media into a React application?

### Answer

I use the browser MediaDevices API.

Workflow

```
User Clicks Camera

↓

Permission Request

↓

Camera Opens

↓

Preview

↓

Capture Image

↓

Compress

↓

Upload

↓

Cloud Storage
```

### Permission

```javascript
navigator.mediaDevices.getUserMedia({
  video: true,
});
```

If permission is denied,

I catch

```
NotAllowedError
```

and show a proper message.

### Upload

I use

```
FormData
```

instead of Base64.

Before upload I validate

- File Type
- File Size
- MIME Type

Large images are compressed before uploading.

---

# 10. How do you handle Camera Permissions?

### Answer

When a user clicks Capture,

the browser requests permission using

```
navigator.mediaDevices.getUserMedia()
```

Possible scenarios

Permission Granted

- Camera Opens

Permission Denied

- Show meaningful error
- Explain why permission is required
- Allow retry

I also stop the MediaStream after usage to release the camera.

---

# 11. How do you make React applications Responsive?

### Answer

I follow a Mobile First approach.

I use

- CSS Grid
- Flexbox
- Media Queries
- Responsive Units
- Tailwind Breakpoints

Examples

```
sm

md

lg

xl
```

I also test on

- Mobile
- Tablet
- Desktop

using browser developer tools.

---

# 12. Technical Words for Performance Optimization

- Lazy Loading
- Code Splitting
- Dynamic Import
- Tree Shaking
- Bundle Optimization
- React.memo
- useMemo
- useCallback
- Virtualization
- Pagination
- Infinite Scroll
- Debouncing
- Throttling
- Image Compression
- WebP
- CDN
- Gzip
- Brotli
- Browser Cache
- HTTP Cache
- React Query
- SWR
- Core Web Vitals
- LCP
- INP
- CLS

---

# 13. Technical Words for Accessibility

- WCAG
- Semantic HTML
- Keyboard Navigation
- Screen Reader
- Focus Management
- Focus Trap
- ARIA Labels
- ARIA Roles
- Color Contrast
- Accessible Forms
- Alt Text
- Lighthouse
- axe DevTools

---

# 14. Technical Words for Media Integration

- MediaDevices API
- Permissions API
- getUserMedia()
- MediaStream
- Blob
- FormData
- Multipart Upload
- MIME Validation
- File API
- Chunk Upload
- Retry Mechanism
- Progress Indicator
- Object Storage
- Presigned URL
- HTTPS
- Authentication
- Authorization
