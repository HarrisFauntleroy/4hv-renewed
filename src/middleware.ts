export const middleware = async () => {
  console.log('middleware');
};

export const config = {
  matcher: '/post/:path*',
};
