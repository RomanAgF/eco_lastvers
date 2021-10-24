export default function ensureLoggedOut(callback, redirectDestination) {
  return async context => {
    const user = context.req.session.get("user");

    if (user) {
      return {
        redirect: {
          destination: redirectDestination,
          permanent: false,
        },
      };
    }

    return await callback(context);
  };
}
