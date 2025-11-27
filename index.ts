import { faker } from '@faker-js/faker';
import 'expo-router/entry';
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Response,
  RestSerializer,
  Server,
} from 'miragejs';

declare global {
  interface Window {
    server: Server;
  }
}

export let jinny: any;

if (__DEV__) {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = createServer({
    // db 모델 관계 설정
    models: {
      user: Model.extend({
        posts: hasMany('post'),
        comments: hasMany('comment'),
        notifications: hasMany('notification'),
      }),
      post: Model.extend({
        user: belongsTo('user'),
        comments: hasMany('comment'),
      }),
      like: Model.extend({
        user: belongsTo('user'),
        post: belongsTo('post'),
      }),
      comment: Model.extend({
        user: belongsTo('user'),
        post: belongsTo('post'),
      }),
      notification: Model.extend({
        user: belongsTo('user'),
      }),
      follow: Model.extend({
        from: belongsTo('user'),
        to: belongsTo('user'),
      }),
      followRequest: Model.extend({
        from: belongsTo('user'),
        to: belongsTo('user'),
      }),
    },
    // 데이터 형태 변환 객체 <-> JSON
    serializers: {
      post: RestSerializer.extend({
        include: ['user', 'comments'],
        embed: true,
      }),
      comment: RestSerializer.extend({
        include: ['user'],
        embed: true,
      }),
      notification: RestSerializer.extend({
        include: ['user'],
        embed: true,
      }),
    },
    // 더미 데이터 생산
    factories: {
      user: Factory.extend({
        // () => 함수형으로 사용하면 매번 함수가 실행되면서 랜덤한 값으로 가져온다.
        id: () => faker.string.uuid(),
        email: () => faker.internet.email(),
        nickname: () => faker.internet.username(),
        bio: () => faker.person.bio(),
        profileImageUrl: () =>
          `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100_000)}?v=4`,
      }),
      post: Factory.extend({
        id: () => faker.string.numeric(6),
        content: () => faker.lorem.paragraph(),
        imageUrls: () =>
          Array.from({ length: Math.floor(Math.random() * 3) }, () => faker.image.url()),
        likes: () => Math.floor(Math.random() * 100),
        createdAt: () => faker.date.recent({ days: 3 }).toISOString(),
        updatedAt: () =>
          Math.random() > 0.5 ? faker.date.recent({ days: 2 }).toISOString() : null,
      }),
      like: Factory.extend({
        id: () => faker.string.numeric(6),
        createdAt: () => faker.date.recent({ days: 2 }).toISOString(),
      }),
      comment: Factory.extend({
        id: () => faker.string.numeric(6),
        content: () => faker.lorem.sentence(),
        createdAt: () => faker.date.recent({ days: 2 }).toISOString(),
      }),
      notification: Factory.extend({
        id: () => faker.string.numeric(6),
        type: () => faker.helpers.arrayElement(['follow', 'like', 'goal', 'badge', 'comment']),
        content() {
          const type = this.type;
          switch (type) {
            case 'follow':
              return '님이 회원님을 팔로우하기 시작했습니다.';
            case 'like':
              return '님이 회원님의 게시물에 좋아요를 눌렀습니다.';
            case 'goal':
              return "님이 '주간 10km 달리기' 목표를 달성했습니다.";
            case 'badge':
              return "님이 '첫 완주' 배지를 획득했습니다.";
            case 'comment':
              return '님이 회원님의 게시물에 댓글을 남겼습니다: "화이팅!"';
            default:
              return '새로운 알림이 있습니다.';
          }
        },
        targetId: () => faker.number.int({ min: 1, max: 999 }),
        createdAt: () => faker.date.recent({ days: 5 }).toISOString(),
        isRead: () => faker.datatype.boolean(),
      }),
      follow: Factory.extend({
        id: () => faker.string.numeric(6),
        status: () => faker.helpers.arrayElement(['0', '1', '2']),
      }),
      followRequest: Factory.extend({
        id: () => faker.string.numeric(6),
      }),
    },
    seeds(server) {
      // 내 프로필 (진희)
      jinny = server.create('user', {
        id: 'uuid-jinny',
        nickname: 'Jinny',
        bio: 'programmer',
        profileImageUrl: 'https://i.pinimg.com/1200x/31/9b/21/319b21b0bcaacf7bb8a8307998c3a46e.jpg',
      });

      // 랜덤 유저 10명 생성
      const users = server.createList('user', 10);

      // 내가 쓴 게시글 3개 생성
      const jinnyPosts = server.createList('post', 3, {
        user: jinny,
        content: '이건 내가 쓴 글이에요 💬',
      });

      // 내가 쓴 글마다 댓글 추가
      jinnyPosts.forEach((post) => {
        // 랜덤 유저들이 단 댓글
        const randomCommentCount = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < randomCommentCount; i++) {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          server.create('comment', {
            user: randomUser,
            post,
            content: `랜덤 유저 ${randomUser.nickname}의 댓글`,
          });
        }
      });

      // 다른 유저들이 쓴 글 + 댓글 생성
      users.forEach((user) => {
        const posts = server.createList('post', 5, { user });

        // 좋아요 생성
        posts.forEach((post) => {
          const likeCount = Math.floor(Math.random() * 10);
          for (let i = 0; i < likeCount; i++) {
            const randomUser = faker.helpers.arrayElement(users);
            server.create('like', {
              user: randomUser, // 좋아요 누른 유저
              post, // 좋아요 받은 게시물
            });
            server.create('like', {
              user: jinny,
              post, // 좋아요 받은 게시물
            });
          }
        });

        // 댓글 생성
        posts.forEach((post) => {
          const randomCommentCount = Math.floor(Math.random() * 6);
          for (let i = 0; i < randomCommentCount; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            server.create('comment', {
              user: randomUser,
              post,
              content: `랜덤 댓글 by ${randomUser.nickname}`,
            });
            // 내가 단 댓글
            server.create('comment', {
              user: jinny,
              post,
              content: '내가 직접 단 댓글이에요 😊',
            });
          }
        });
      });

      // 알림 생성 (선택)
      users.forEach((user) => {
        server.createList('notification', 1, { user });
      });

      // 랜덤 팔로우 15개 생성 (create 시점에서 관계 명확히 전달)
      const followTargets = faker.helpers.arrayElements(users, 5); // 최대 5명

      followTargets.forEach((user) => {
        if (user.id === jinny.id) return;

        server.create('follow', {
          from: jinny,
          to: user,
          status: '1',
        });
      });
      // jinny → 5명 이하(랜덤) 팔로우
      // users.forEach((user) => {
      //   server.create('follow', {
      //     from: jinny,
      //     to: user,
      //     status: '1',
      //   });
      // });

      // 다른 유저 → jinny 팔로우 요청 3개 생성
      const followRequestSenders = faker.helpers.arrayElements(users, 3);

      followRequestSenders.forEach((user) => {
        if (user.id === jinny.id) return;

        server.create('followRequest', {
          from: user,
          to: jinny, // ✔ 나에게 요청 온 사람
        });
      });
    },
    routes() {
      this.passthrough('https://dapi.kakao.com/**');

      // 게시글 목록 조회
      this.get('/posts', (schema, request) => {
        let posts = schema.all('post').models;
        let likes = schema.all('like').models;
        let targetIndex = -1;

        if (request.queryParams.cursor) {
          targetIndex = posts.findIndex((v) => v.id === request.queryParams.cursor);
        }

        const sliced = posts.slice(targetIndex + 1, targetIndex + 11);

        const result = sliced.map((post) => {
          const postLikes = likes.filter((l) => l.post.id === post.id);
          const isLiked = postLikes.some((l) => l.user.id === jinny.id);

          return {
            ...post.attrs,
            user: post.user.attrs,
            comments: post.comments.models.map((c) => c.attrs),
            likes: postLikes.length,
            isLiked,
          };
        });

        return { posts: result };
      });

      // 특정 유저 게시글 목록 조회
      this.get('/users/:userId/posts', (schema, request) => {
        const userId = request.params.userId;

        // 모든 포스트 중 userId가 동일한 것만 필터링
        let posts = schema.all('post').models.filter((post) => post.user.id === userId);
        let likes = schema.all('like').models;

        let targetIndex = -1;
        if (request.queryParams.cursor) {
          targetIndex = posts.findIndex((v) => v.id === request.queryParams.cursor);
        }

        const sliced = posts.slice(targetIndex + 1, targetIndex + 11);

        const result = sliced.map((post) => {
          const postLikes = likes.filter((l) => l.post.id === post.id);
          const isLiked = postLikes.some((l) => l.user.id === jinny.id);

          return {
            ...post.attrs,
            user: post.user.attrs,
            comments: post.comments.models.map((c) => c.attrs),
            likes: postLikes.length,
            isLiked,
          };
        });

        return { posts: result };
      });

      this.get('/posts/:postId/comments', (schema, request) => {
        const postId = request.params.postId;
        const post = schema.find('post', postId);

        if (!post) {
          return new Response(404, {}, { message: 'Post not found' });
        }

        const comments = post.comments.models.map((c) => ({
          ...c.attrs,
          user: c.user.attrs,
        }));

        return { comments };
      });

      this.get('/notifications', (schema) => {
        return schema.all('notification');
      });

      // 사용자 정보 조회 - 닉네임이 고유(unique) 할 때 닉네임 기반으로 요청해도 됨
      this.get('/users/:userId', (schema, request) => {
        const userId = request.params.userId;
        const user = schema.find('user', userId);

        if (!user) return new Response(404, {}, { message: 'User not found' });

        const follows = schema.all('follow').models;

        const posts = user.posts.models;

        // followers = 나를 팔로우하는 사람들
        const followers = follows.filter((f) => f.to.id === userId && f.status === '1');

        // following = 내가 팔로우하는 사람들
        const following = follows.filter((f) => f.from.id === userId && f.status === '1');

        // isFollowing = 내가 이 사람을 팔로우 중인지
        const isFollowing = follows.some(
          (f) => f.from.id === 'jinny' && f.to.id === userId && f.status === '1',
        );

        return {
          user: {
            ...user.attrs,
            postCount: posts.length,
            followers: followers.length,
            following: following.length,
            isFollowing,
          },
        };
      });

      // 좋아요 클릭
      this.post('/posts/:postId/like', (schema, request) => {
        const postId = request.params.postId;
        const post = schema.find('post', postId);
        const user = jinny;

        if (!post) {
          return new Response(404, {}, { message: 'Post not found' });
        }

        const likes = schema.all('like').models;

        const existingLike = likes.find(
          (like) => like.post.id === postId && like.user.id === user.id,
        );

        if (existingLike) {
          return new Response(400, {}, { message: 'Already liked' });
        }

        const like = schema.create('like', {
          user,
          post,
        });

        return {
          likeId: like.id,
          postId,
          userId: user.id,
          liked: true,
        };
      });

      // 좋아요 취소
      this.delete('/posts/:postId/like', (schema, request) => {
        const postId = request.params.postId;
        const user = jinny;

        const likes = schema.all('like').models;
        const like = likes.find((l) => l.post.id === postId && l.user.id === user.id);

        if (!like) {
          return new Response(400, {}, { message: 'Not liked yet' });
        }

        schema.find('like', like.id)?.destroy();

        return { postId, userId: user.id, liked: false };
      });

      // 사용자 검색 결과 목록 조회
      this.get('/users', (schema, request) => {
        const keyword = request.queryParams.keyword;
        const following = request.queryParams.following;
        const myId = 'uuid-jinny';

        let users = schema.all('user').models.filter((u) => u.id !== myId);

        // 검색 키워드 있으면 필터링
        if (keyword) {
          if (Array.isArray(keyword)) return;
          const lower = keyword.toLowerCase();
          users = users.filter((u) => u.nickname.toLowerCase().includes(lower));
        }

        // following = true
        if (following === 'true') {
          users = users.filter((u) =>
            schema.all('follow').models.some((f) => f.from?.id === myId && f.to?.id === u.id),
          );
        }

        return {
          users: users.map((user) => ({
            id: user.id,
            nickname: user.nickname,
            bio: user.bio,
            profileImageUrl: user.profileImageUrl,
            // 관계 정보
            isFollowing: schema
              .all('follow')
              .models.some((f) => f.from?.id === myId && f.to?.id === user.id),
            isRequestedByMe: schema
              .all('followRequest')
              .models.some((f) => f.from?.id === myId && f.to?.id === user.id),
            isRequestedToMe: schema
              .all('followRequest')
              .models.some((f) => f.from?.id === user.id && f.to?.id === myId),
          })),
        };
      });
    },
  });
}
