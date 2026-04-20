import prisma from '../src/config/db.js';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

try {
  // Only truncate table in development mode
  if(isDev) {
    await prisma.$queryRaw`TRUNCATE tasks RESTART IDENTITY CASCADE;`;
    console.log('Development: Library table truncated');
  }
  const mediaCount = prisma.media.count();
  if(mediaCountCount === 0) {
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
  

  const userCount = prisma.media.count();
  if(userCount === 0) {
    await prisma.user.createMany({
      data: [
        {name: 'Sarah Green', email: 'sgreen@library.com', password: 'green1234', role: 'ADMIN'},
        {name: 'Lionel William', email: 'lwilliam@library.com', password: 'william1234', role: 'ADMIN'},
        {name: 'Sam Smith', email: 'ssmith@demo.com', password: 'smith1234', role: 'USER'},
        {name: 'Jane Wu', email: 'jwu@demo.com', password: 'wu1234', role: 'USER'}
      ]
    });
    console.log('Users seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
  

  const loanCount = prisma.loan.count();
  if(loanCount === 0) {
    await prisma.loan.createMany({
      data: [
        {status: 'LOANED', borrowedAt: '2026-04-15T23:11:22.221Z', dueAt: '2026-05-06T23:11:22.221Z', mediaId: 1, borrowerId: 2},
        {status: 'RETURNED', borrowedAt: '2026-03-07T23:11:22.221Z', dueAt: '2026-03-28T23:11:22.221Z', mediaId: 3, borrowerId: 1},
        {status: 'LOANED', borrowedAt: '2026-04-06T23:11:22.221Z', dueAt: '2026-04-24T23:11:22.221Z', mediaId: 7, borrowerId: 2},
        {status: 'LOANED', borrowedAt: '2026-04-15T23:11:22.221Z', dueAt: '2026-05-06T23:11:22.221Z', mediaId: 2, borrowerId: 1}
      ]
    });
     console.log('Loans seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
 

  const reviewCount = prisma.review.count();
  if(reviewCount === 0) {
    await prisma.review.createMany({
      data: [
        {content: 'Foundational fantasy', createdAt: '2026-03-19T23:11:22.221Z', mediaId: 1, authorId: 2},
        {content: 'Both scary and thoughful', createdAt: '2026-04-19T23:11:22.221Z', mediaId: 3, authorId: 1},
        {content: 'Classic platformer', createdAt: '2026-04-23T23:11:22.221Z', mediaId: 7, authorId: 2}
      ]
    });
    console.log('Reviews seeded successfully');
  } else {
    console.log('Database already contains data.')
  }
  

  const subCount = prisma.subscription.count();
  if(subCount === 0) {
    await prisma.subscription.createMany({
      data: [
        {title: 'Libby', startedAt: '2026-03-21T23:11:22.221Z', ownerId: 1},
        {title: 'Hoopla', startedAt: '2026-04-12T23:11:22.221Z', ownerId: 1},
        {title: 'Libby', startedAt: '2026-03-09T23:11:22.221Z', ownerId: 2}
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