const now = new Date();
export const tomorrow = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1
);
export const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
export const yesterday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 1
);
export const currentWeekStart = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 7
);
export const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 2);
export const currentMonthEnd = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  1
);
export const previousMonthStart = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  2
);
export const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);
