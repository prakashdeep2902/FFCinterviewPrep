# Top 25 NestJS Interview Questions & Answers

## 1. What is NestJS and why is it used?

**Answer:**
NestJS is a progressive Node.js framework built with TypeScript for creating scalable and maintainable server-side applications. It follows a modular architecture and supports patterns like Dependency Injection, MVC, and Microservices.

---

## 2. What are the main features of NestJS?

**Answer:**

- TypeScript support
- Dependency Injection
- Modular architecture
- Built-in testing support
- Middleware, Guards, Pipes, Interceptors
- Microservices support
- WebSocket support
- Easy integration with databases

---

## 3. How is NestJS different from Express.js?

**Answer:**

| NestJS                | Express.js            |
| --------------------- | --------------------- |
| Framework             | Minimal Web Server    |
| Opinionated Structure | Flexible Structure    |
| Dependency Injection  | No Built-in DI        |
| TypeScript First      | JavaScript First      |
| Scalable Architecture | Requires Manual Setup |

NestJS uses Express (or Fastify) under the hood.

---

## 4. What is a Module in NestJS?

**Answer:**
A module organizes related components such as controllers and services.

```ts
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

Every NestJS application has at least one module: `AppModule`.

---

## 5. What is a Controller?

**Answer:**
Controllers handle incoming HTTP requests and return responses.

```ts
@Controller("users")
export class UserController {
  @Get()
  getUsers() {
    return "All Users";
  }
}
```

---

## 6. What is a Service/Provider?

**Answer:**
Services contain business logic and can be injected into controllers.

```ts
@Injectable()
export class UserService {
  getUsers() {
    return [];
  }
}
```

---

## 7. Explain Dependency Injection in NestJS.

**Answer:**
Dependency Injection allows NestJS to automatically create and inject required dependencies.

```ts
constructor(private userService: UserService) {}
```

Benefits:

- Loose coupling
- Better testing
- Easier maintenance

---

## 8. What are decorators in NestJS?

**Answer:**
Decorators are special annotations that add metadata.

Examples:

```ts
@Controller()
@Get()
@Post()
@Injectable()
@Module()
```

They help NestJS understand how classes and methods should behave.

---

## 9. What is the purpose of `@Injectable()`?

**Answer:**
Marks a class as a provider that can participate in Dependency Injection.

```ts
@Injectable()
export class UserService {}
```

Without it, NestJS cannot inject the service properly.

---

## 10. What is the role of `main.ts`?

**Answer:**
Entry point of the application.

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

It creates and starts the NestJS application.

---

## 11. Explain the NestJS Request Lifecycle.

**Answer:**

```
Request
 ↓
Middleware
 ↓
Guards
 ↓
Interceptors (Before)
 ↓
Pipes
 ↓
Controller
 ↓
Service
 ↓
Interceptors (After)
 ↓
Exception Filters
 ↓
Response
```

---

## 12. What are Guards in NestJS?

**Answer:**
Guards determine whether a request should proceed.

```ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return true;
  }
}
```

Common use:

- Authentication
- Authorization

---

## 13. Difference between Guards, Middleware, and Interceptors?

| Feature           | Middleware | Guard | Interceptor |
| ----------------- | ---------- | ----- | ----------- |
| Runs Before Route | ✅         | ✅    | ✅          |
| Authentication    | ❌         | ✅    | ❌          |
| Modify Request    | ✅         | ❌    | ✅          |
| Modify Response   | ❌         | ❌    | ✅          |

---

## 14. What are Pipes?

**Answer:**
Pipes transform and validate incoming data.

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return id;
}
```

---

## 15. What is ValidationPipe?

**Answer:**
Automatically validates incoming request data.

```ts
app.useGlobalPipes(new ValidationPipe());
```

Example:

```ts
export class CreateUserDto {
  @IsEmail()
  email: string;
}
```

---

## 16. How do you implement DTOs in NestJS?

**Answer:**
DTO (Data Transfer Object) defines the structure of request data.

```ts
export class CreateUserDto {
  name: string;
  email: string;
}
```

Benefits:

- Validation
- Type Safety
- Cleaner Code

---

## 17. What are Interceptors?

**Answer:**
Interceptors can transform requests and responses.

```ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {}
```

Use Cases:

- Logging
- Caching
- Response Mapping

---

## 18. What are Exception Filters?

**Answer:**
Exception Filters handle errors globally or locally.

```ts
@Catch(HttpException)
export class HttpExceptionFilter {}
```

Used for:

- Custom error responses
- Global error handling

---

## 19. How do you handle global exception handling?

**Answer:**

```ts
app.useGlobalFilters(new HttpExceptionFilter());
```

This catches errors across the entire application.

---

## 20. What is the difference between `useClass`, `useValue`, and `useFactory`?

### useClass

```ts
{
  provide: UserService,
  useClass: UserService
}
```

Creates a new instance.

---

### useValue

```ts
{
  provide: 'CONFIG',
  useValue: {
    apiKey: '123'
  }
}
```

Provides a fixed value.

---

### useFactory

```ts
{
  provide: 'DATABASE',
  useFactory: () => {
    return createConnection();
  }
}
```

Creates dependency dynamically.

---

## 21. How do you implement JWT Authentication?

**Answer:**

Install:

```bash
npm install @nestjs/jwt passport-jwt
```

Generate token:

```ts
const token = this.jwtService.sign({
  userId: user.id,
});
```

Protect routes:

```ts
@UseGuards(JwtAuthGuard)
@Get('profile')
```

---

## 22. What is Passport.js and how does NestJS integrate with it?

**Answer:**
Passport.js is an authentication middleware.

NestJS integrates through:

```ts
@nestjs/passport
```

Strategies:

- JWT
- Google OAuth
- Facebook OAuth
- Local Strategy

---

## 23. Explain Auth Guards.

**Answer:**
Auth Guards check if a user is authenticated.

```ts
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
```

Applied as:

```ts
@UseGuards(JwtAuthGuard)
```

---

## 24. How do you implement Role-Based Access Control (RBAC)?

### Create Roles Decorator

```ts
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
```

### Apply

```ts
@Roles('admin')
@Get()
findAll() {}
```

### Create Roles Guard

Check user role before allowing access.

---

## 25. How do you secure API endpoints?

**Answer:**

1. JWT Authentication
2. Role-Based Authorization
3. Validation Pipes
4. Rate Limiting
5. HTTPS
6. Helmet Security Headers
7. Environment Variables
8. Input Sanitization
9. CORS Configuration
10. Password Hashing using bcrypt

Example:

```ts
app.use(helmet());

app.enableCors();

@UseGuards(JwtAuthGuard)
@Get('profile')
```

### Interview Tip

For experienced roles, be ready to explain:

**Request Lifecycle → Dependency Injection → JWT Auth → Guards → Pipes → TypeORM/Prisma → Exception Filters → Microservices**

These topics cover about **80% of NestJS interview questions** asked in React + Node/NestJS full-stack interviews.
