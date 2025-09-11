export async function fetchMockBlogs() {
  return [
    {
      id: 1,
      title: 'A Weekend in Queenstown',
      description: "Stunning views, icy lakes, and too much Fergburger — here's how my trip went.",
      imageUrl: '/groupPic.png',
    },
    {
      id: 2,
      title: 'Why I Stopped Using My Phone After 10 PM',
      description:
        'This small habit change surprisingly fixed my sleep schedule and made mornings less miserable.',
      imageUrl: '/groupPic.png',
    },
    {
      id: 3,
      title: 'Things I Wish I Knew Before University',
      description:
        'From picking the wrong major to stressing over grades, here’s what I’d tell my past self — and what actually matters long-term.',
      imageUrl: '/groupPic.png',
    },
    {
      id: 4,
      title: 'My Favourite Study Cafés in Auckland',
      description:
        'Good coffee, strong Wi-Fi, and decent background music — what else do you need?',
      imageUrl: '/groupPic.png',
    },
    {
      id: 5,
      title: 'Trying to Cook for a Week Without Ordering In',
      description:
        'Spoiler: I failed on day four. But I did learn a couple recipes and how not to burn rice.',
      imageUrl: '/groupPic.png',
    },
  ]
}
