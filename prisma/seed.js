import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

try {
  // Only truncate table in development mode
  if(isDev) {
    await prisma.$queryRaw`TRUNCATE media, users, loans, review, subscriptions RESTART IDENTITY CASCADE;`;
    console.log('Development: Library table truncated');
  }
  const mediaCount = await prisma.media.count();
  if(mediaCount === 0) {
    await prisma.media.createMany({
      data: [
        {title: 'The Lord of the Rings', author: 'J.R.R. Tolkein', genre: 'Fantasy', format: 'Book'},
        {title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genre: 'Adventure', format: 'Book'},
        {title: 'Alien', author: 'Ridley Scott', genre: 'Science Fiction', format: 'Film'},
        {title: 'The Matrix', author: 'The Watchowskis', genre: 'Science Fiction', format: 'Film'},
        {title: 'Super Mario Bros.', author: 'Nintendo', genre: 'Platformer', format: 'Video Game'},
        {title: 'Resident Evil', author: 'Capcom', genre: 'Survival Horror', format: 'Video Game'},
      ]
    });
    console.log('Media seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
  

  const userCount = await prisma.user.count();
  if(userCount === 0) {
    let p1 = await bcrypt.hash('green1234', 10);
    let p2 = await bcrypt.hash('william1234', 10);
    let p3 = await bcrypt.hash('smith1234', 10);
    let p4 = await bcrypt.hash('wu1234', 10);
    await prisma.user.createMany({
      data: [
        {name: 'Sarah Green', email: 'sgreen@library.com', password: p1, role: 'ADMIN'},
        {name: 'Lionel William', email: 'lwilliam@library.com', password: p2, role: 'ADMIN'},
        {name: 'Sam Smith', email: 'ssmith@demo.com', password: p3, role: 'USER'},
        {name: 'Jane Wu', email: 'jwu@demo.com', password: p4, role: 'USER'}
      ]
    });
    console.log('Users seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
  

  const loanCount = await prisma.loan.count();
  if(loanCount === 0) {
    await prisma.loan.createMany({
      data: [
        {status: 'LOANED', borrowedAt: '2026-04-15T23:11:22.221Z', dueAt: '2026-05-06T23:11:22.221Z', mediaId: 1, borrowerId: 4},
        {status: 'RETURNED', borrowedAt: '2026-03-07T23:11:22.221Z', dueAt: '2026-03-28T23:11:22.221Z', mediaId: 3, borrowerId: 3},
        {status: 'LOANED', borrowedAt: '2026-04-06T23:11:22.221Z', dueAt: '2026-04-24T23:11:22.221Z', mediaId: 5, borrowerId: 4},
        {status: 'LOANED', borrowedAt: '2026-04-15T23:11:22.221Z', dueAt: '2026-05-06T23:11:22.221Z', mediaId: 2, borrowerId: 3}
      ]
    });
     console.log('Loans seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
 

  const reviewCount = await prisma.review.count();
  if(reviewCount === 0) {
    await prisma.review.createMany({
      data: [
        {content: 'Foundational fantasy', createdAt: '2026-03-19T23:11:22.221Z', mediaId: 1, authorId: 4},
        {content: 'Both scary and thoughful', createdAt: '2026-04-19T23:11:22.221Z', mediaId: 3, authorId: 3},
        {content: 'Classic platformer', createdAt: '2026-04-23T23:11:22.221Z', mediaId: 5, authorId: 4}
      ]
    });
    console.log('Reviews seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
  

  const subCount = await prisma.subscription.count();
  if(subCount === 0) {
    await prisma.subscription.createMany({
      data: [
        {title: 'Libby', startedAt: '2026-03-21T23:11:22.221Z', ownerId: 3},
        {title: 'Hoopla', startedAt: '2026-04-12T23:11:22.221Z', ownerId: 3},
        {title: 'Libby', startedAt: '2026-03-09T23:11:22.221Z', ownerId: 4}
      ]
    });
    console.log('Subscriptions seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
} catch (error) {
  console.error('Seed Failed', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}