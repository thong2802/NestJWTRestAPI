import { PrismaService } from '../src/prisma/prisma.service';
// make a database for testing
// Everytime we run tests, clean up data
// We must call request like we do with postman
// how to run prisma stusio "test" : npx dotenv -e .env.test -- prisma studio
// how to run prisma stusio "dev" : npx dotenv -e .env -- prisma studio
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum'
import {Test} from '@nestjs/testing'
import {AppModule} from '../src/app.module'
import { application } from 'express';

const PORT = 3002;
describe('App EndToEnd tests', () => {
    let app: INestApplication
    let prismaService: PrismaService;

    beforeAll(async () => {
        const appModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        app = appModule.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());   
        await app.init();
        await app.listen(PORT);

        console.log(PORT)
        prismaService = app.get(PrismaService);
        await prismaService.cleanDataBase();
        pactum.request.setBaseUrl(`http://localhost:${PORT}`);
    })

    describe('Test Authentication', () => {
        describe('Register', () => {
            it('should Register', () => {
                return pactum.spec()
                .post(`/auth/register`)
                .withBody({
                    email: 'thong12345677@gmail.com',
                    password: '123455'
                })
                .expectStatus(201)
            });

            it('should show error with empty email', () => {
                return pactum.spec()
                .post(`/auth/register`)
                .withBody({
                    email: '',
                    password: '123455'
                })
                .expectStatus(400)
            })

            it('should show error with invalid email format', () => {
                return pactum.spec()
                .post(`/auth/register`)
                .withBody({
                    email: 'thong12345677@.com',
                    password: '123455'
                })
                .expectStatus(400)
            })

            it('should show error with password empty', () => {
                return pactum.spec()
                .post(`/auth/register`)
                .withBody({
                    email: 'thong12345677@.com',
                    password: ''
                })
                .expectStatus(400)
            })
        })
        describe('login', () => {
            it('should login', () => {
                return pactum.spec()
                .post(`/auth/login`)
                .withBody({
                    email: 'thong12345677@gmail.com',
                    password: '123455'
                })
                .expectStatus(201)
            })
        })
    })


    afterAll(async () => {
        app.close();
    });

    it.todo('Pass');
})


