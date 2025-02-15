import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Burger menu
      hello: "Hello",
      account: "Account",
      wishlist: "Wishlist",
      orders: "Orders",
      history: "History",
      settings: "Settings",
      refund: "Refund",
      dashboard: "Dashboard",

      // Sort
      sortByDateNewest: "Sort by date (newest)",
      sortByDateOldest: "Sort by date (oldest)",

      sortByLikesHighest: "Sort by likes (highest)",
      sortByLikesLowest: "Sort by likes (lowest)",

      sortByOrdersMost: "Sort by orders (most)",
      sortByOrdersLeast: "Sort by orders (least)",

      sortByPriceHighest: "Sort by price (highest)",
      sortByPriceLowest: "Sort by price (lowest)",

      sortByDiscountHighest: "Sort by discount (highest)",
      sortByDiscountLowest: "Sort by discount (lowest)",

      // Login Page
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot Password?",
      notAMember: "Not a member?",
      signUp: "Sign Up",
      login: "Login",

      // Signup Page
      username: "Username",
      confirmPassword: "Confirm Password",
      alreadyAMember: "Already a member?",
      pleaseEnterVerificationCode:
        "Please enter the verification code sent to your email.",
      confirm: "Confirm",

      // Navbar
      searchPlaceholder: "Search for products...",

      // Hero
      saveUpTo: "Save up to",
      grandFallSale: "Grand Fall Sale",
      thePromotionEndsIn: "The promotion ends in:",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      shopNow: "Shop Now",

      // Main page
      summerSale: "Summer Sale",
      designedForYou: "Designed for you",
      under50: "Under $50",
      freeShipping: "Free Shipping",

      // Notifications page
      all: "All",
      message: "Message",
      warning: "Warning",

      // Shopping cart
      shoppingCart: "Shopping Cart",
      items: "Items",
      summary: "Summary",
      shipping: "Shipping",
      coupons: "Coupons",
      total: "Total",
      couponCode: "Coupon Code",
      order: "Order",

      // Account user page
      reviews: "Reviews",
      replies: "Replies",

      //Search page
      delivery: "Delivery",
      discount: "Discount",
      sale: "Sale",
      rating: "Rating",
      price: "Price",

      // Product page
      averageRating: "Average Rating",
      unitsSold: "Units Sold",
      createdBy: "Created by",
      uploaded: "Uploaded",
      buyNow: "Buy Now",
      descriptionIsLoading: "Description is loading ...",
      stars: "stars",
      showReplies: "Show Replies",
      moreFromSeller: "More from seller",

      // Orders page
      estimatedDelivery: "Estimated Delivery",
      ordered: "Ordered",
      shipped: "Shipped",
      delivered: "Delivered",
      pending: "Pending",
      cancelled: "Cancelled",
      totalPrice: "Total Price",
      confirmOrderDelivery: "Confirm Order Delivery",
      refundItem: "Refund Item",

      // History page
      recentHistory: "Recent History",

      // Settings page
      accountInfo: "Account Info",
      firstName: "First Name",
      lastName: "Last Name",
      streetAddress: "Street Address",
      city: "City",
      zipOrPostalCode: "Zip or Postal Code",
      country: "Country",
      phoneNumber: "Phone Number",
      saveChanges: "Save Changes",
      changePassword: "Change Password",
      role: "Role",
      requestSeller: "Request Seller",
      areYouSureYouWontBeAbleToRevertThisDecision:
        "Are you sure? You won't be able to revert this decision.",
      language: "Language",

      // Refund page
      refundRequests: "Refund Requests",
      approved: "Approved",
      rejected: "Rejected",

      // Dashboard page
      overview: "Overview",
      refunds: "Refunds",
      addProduct: "Add Product",
      bans: "Bans",
      admins: "Admins",
      notifications: "Notifications",
      requests: "Requests",
      reports: "Reports",

      // Modal
      cancel: "Cancel",
      submit: "Submit",

      // Add product modal
      productName: "Product Name",
      productCover: "Product Cover",
      productImages: "Product Images",
      productDescriptionMd: "Product Description (.md)",
      noFilesSelected: "No files selected",

      // Dashboard reviews ppage
      posted: "Posted",
      reply: "Reply",

      // Dashboard orders page
      product: "Product",
      quantity: "Quantity",
      status: "Status",
      respond: "Respond",

      // Dashboard coupon page
      totalCoupons: "Total Coupons",
      highestDiscount: "Highest Discount",
      code: "Code",
      validUntil: "Valid Until",
      affectedItems: "Affected Items",

      // Toast
      pleaseEnterAllFields: "Please enter all fields.",
      somethingWentWrong: "Something went wrong",

      changingPassword: "Changing password ...",
      passwordChanged: "Password changed",

      loggingOut: "Logging out...",
      loggedOut: "Logged out",

      sendingRequest: "Sending request ...",
      requestSent: "Request sent",

      creatingAccount: "Creating account...",
      createdAccount: "Created account",

      updating: "Updating...",
      updatedData: "Updated data",

      couldntConfirmEmail: "Couldn't confirm email, please try again.",
      couldntSignUp: "Couldn't sign up, please try again.",

      addingToCart: "Adding to cart...",
      failedToAddToCart: "Failed to add to cart",
      addedToCart: "Added to cart",

      applyingCoupon: "Applying coupon...",
      appliedCoupon: "Applied coupon",
      failedToApplyCoupon: "Failed to apply coupon",

      deletingCartItem: "Deleting item...",
      deletedCartItem: "Deleted item cart item",
      failedToDeleteCartItem: "Failed to delete cart item",

      failedToIncrementQuantity: "Failed to increment quantity",

      updatingQuantity: "Updating quantity...",
      failedToUpdateQuantity: "Failed to update quantity",
      updatedQuantity: "Updated quantity",

      failedToConfirmDelivery: "Failed to confirm delivery",
      deliveryConfirmed: "Delivery confirmed",

      failedToCreateProduct: "Failed to create product",

      productDeleted: "Product deleted",
      failedToDeleteProduct: "Failed to delete product",

      failedToRequestRefund: "Failed to request refund",
      refundRequested: "Refund requested",

      addingToWishlist: "Adding to wishlist...",
      addedToWishlist: "Added to wishlist",
      failedToAddToWishlist: "Failed to add to wishlist",

      removingFromWishlist: "Removing from wishlist...",
      removedFromWishlist: "Removed from wishlist",

      pleaseAddItemsToCart: "Please add items to cart",

      invalidUsernameOrPassword: "Invalid username or password",
      loggingIn: "Logging in...",
      loggedInSuccessfully: "Logged in successfully",

      pleaseFillInAtLeastOneField: "Please fill in at least one field",
      passwordsDontMatch: "Passwords don't not match",
      pleaseFillInAllFields: "Please fill in all fields",

      pleaseEnterACode: "Please enter a code",

      pleaseTryAgainLater: "Please try again later",

      banned: "Banned",
      create: "Create",

      respondToRequest: "Respond to request",
      response: "Response",
      writeYourResponseHere: "Write your response here",
    },
  },
  sl: {
    translation: {},
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
