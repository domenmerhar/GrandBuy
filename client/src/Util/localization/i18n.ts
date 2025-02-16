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

      // Search page
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

      // Dashboard reviews page
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
    translation: {
      // Burger menu
      hello: "Zdravo",
      account: "Račun",
      wishlist: "Seznam želja",
      orders: "Naročila",
      history: "Zgodovina",
      settings: "Nastavitve",
      refund: "Vračilo",
      dashboard: "Nadzorna plošča",

      // Sort
      sortByDateNewest: "Razvrsti po datumu (najnovejše)",
      sortByDateOldest: "Razvrsti po datumu (najstarejše)",

      sortByLikesHighest: "Razvrsti po všečkih (največ)",
      sortByLikesLowest: "Razvrsti po všečkih (najmanj)",

      sortByOrdersMost: "Razvrsti po naročilih (največ)",
      sortByOrdersLeast: "Razvrsti po naročilih (najmanj)",

      sortByPriceHighest: "Razvrsti po ceni (najvišja)",
      sortByPriceLowest: "Razvrsti po ceni (najnižja)",

      sortByDiscountHighest: "Razvrsti po popustu (največji)",
      sortByDiscountLowest: "Razvrsti po popustu (najmanjši)",

      // Login Page
      email: "E-pošta",
      password: "Geslo",
      forgotPassword: "Ste pozabili geslo?",
      notAMember: "Niste član?",
      signUp: "Registracija",
      login: "Prijava",

      // Signup Page
      username: "Uporabniško ime",
      confirmPassword: "Potrdite geslo",
      alreadyAMember: "Ste že član?",
      pleaseEnterVerificationCode:
        "Vnesite potrditveno kodo, poslano na vaš e-poštni naslov.",
      confirm: "Potrdi",

      // Login Page
      searchPlaceholder: "Iščite izdelke...",

      // Hero
      saveUpTo: "Prihranite do",
      grandFallSale: "Velika jesenska razprodaja",
      thePromotionEndsIn: "Promocija se konča čez:",
      days: "dni",
      hours: "ur",
      minutes: "minut",
      seconds: "sekund",
      shopNow: "Nakupuj zdaj",

      // Main page
      summerSale: "Poletna razprodaja",
      designedForYou: "Oblikovano za vas",
      under50: "Pod 50$",
      freeShipping: "Brezplačna dostava",

      // Notifications page
      all: "Vse",
      message: "Sporočilo",
      warning: "Opozorilo",

      // Shopping cart
      shoppingCart: "Nakupovalna košarica",
      items: "Izdelki",
      summary: "Povzetek",
      shipping: "Dostava",
      coupons: "Kuponi",
      total: "Skupaj",
      couponCode: "Koda kupona",
      order: "Naročilo",

      // Account user page
      reviews: "Ocene",
      replies: "Odzivi",

      // Search page
      delivery: "Dostava",
      discount: "Popust",
      sale: "Razprodaja",
      rating: "Ocena",
      price: "Cena",

      // Product page
      averageRating: "Povprečna ocena",
      unitsSold: "Prodane enote",
      createdBy: "Ustvaril",
      uploaded: "Naloženo",
      buyNow: "Kupi zdaj",
      descriptionIsLoading: "Opis se nalaga ...",
      stars: "zvezdice",
      showReplies: "Pokaži odgovore",
      moreFromSeller: "Več od tega prodajalca",

      // Orders page
      estimatedDelivery: "Predvidena dostava",
      ordered: "Naročeno",
      shipped: "Poslano",
      delivered: "Dostavljeno",
      pending: "V obdelavi",
      cancelled: "Preklicano",
      totalPrice: "Skupna cena",
      confirmOrderDelivery: "Potrdi dostavo naročila",
      refundItem: "Vračilo izdelka",

      // History page
      recentHistory: "Nedavna zgodovina",

      // Settings page
      accountInfo: "Podatki o računu",
      firstName: "Ime",
      lastName: "Priimek",
      streetAddress: "Ulica",
      city: "Mesto",
      zipOrPostalCode: "Poštna številka",
      country: "Država",
      phoneNumber: "Telefonska številka",
      saveChanges: "Shrani spremembe",
      changePassword: "Spremeni geslo",
      role: "Vloga",
      requestSeller: "Zahtevaj status prodajalca",
      areYouSureYouWontBeAbleToRevertThisDecision:
        "Ste prepričani? Tega ne boste mogli razveljaviti.",
      language: "Jezik",

      // Refund page
      refundRequests: "Zahtevki za vračilo",
      approved: "Odobreno",
      rejected: "Zavrnjeno",

      // Dashboard page
      overview: "Pregled",
      refunds: "Vračila",
      addProduct: "Dodaj izdelek",
      bans: "Prepovedi",
      admins: "Skrbniki",
      notifications: "Obvestila",
      requests: "Zahteve",
      reports: "Poročila",

      // Modal
      cancel: "Prekliči",
      submit: "Potrdi",

      // Add product modal
      productName: "Ime izdelka",
      productCover: "Naslovna slika izdelka",
      productImages: "Slike izdelka",
      productDescriptionMd: "Opis izdelka (.md)",
      noFilesSelected: "Ni izbranih datotek",

      // Dashboard reviews page
      posted: "Objavljeno",
      reply: "Odgovori",

      // Dashboard orders page
      product: "Izdelek",
      quantity: "Količina",
      status: "Status",
      respond: "Odgovori",

      // Dashboard coupon page
      totalCoupons: "Skupaj kuponov",
      highestDiscount: "Največji popust",
      code: "Koda",
      validUntil: "Veljavno do",
      affectedItems: "Vplivani izdelki",

      // Toast
      pleaseEnterAllFields: "Prosimo, izpolnite vsa polja.",
      somethingWentWrong: "Prišlo je do napake.",

      changingPassword: "Menjava gesla ...",
      passwordChanged: "Spremenjeno geslo",

      loggingOut: "Odjavljanje...",
      loggedOut: "Odjavljeni",

      sendingRequest: "Pošiljanje zahteve ...",
      requestSent: "Poslana zahteva",

      creatingAccount: "Ustvarjanje računa...",
      createdAccount: "Ustvarjen račun",

      updating: "Posodabljanje...",
      updatedData: "Posodobljeni podatki",

      couldntConfirmEmail: "E-pošte ni bilo mogoče potrditi, poskusite znova.",
      couldntSignUp: "Registracija ni uspela, poskusite znova.",

      addingToCart: "Dodajanje v košarico...",
      failedToAddToCart: "Neuspešno dodajanje v košarico",
      addedToCart: "Dodano v košarico",

      applyingCoupon: "Uveljavljanje kupona...",
      appliedCoupon: "Kupon uveljavljen",
      failedToApplyCoupon: "Neuspešna uveljava kupona",

      deletingCartItem: "Brisanje izdelka...",
      deletedCartItem: "Izdelek odstranjen iz košarice",
      failedToDeleteCartItem: "Neuspešno brisanje izdelka iz košarice",

      failedToIncrementQuantity: "Neuspešno povečanje količine",

      updatingQuantity: "Posodabljanje količine...",
      failedToUpdateQuantity: "Neuspešna posodobitev količine",
      updatedQuantity: "Količina posodobljena",

      failedToConfirmDelivery: "Neuspešna potrditev dostave",
      deliveryConfirmed: "Dostava potrjena",

      failedToCreateProduct: "Neuspešno ustvarjanje izdelka",

      productDeleted: "Izdelek izbrisan",
      failedToDeleteProduct: "Neuspešno brisanje izdelka",

      failedToRequestRefund: "Neuspešna zahteva za vračilo",
      refundRequested: "Zahteva za vračilo poslana",

      addingToWishlist: "Dodajanje na seznam želja...",
      addedToWishlist: "Dodano na seznam želja",
      failedToAddToWishlist: "Neuspešno dodajanje na seznam želja",

      removingFromWishlist: "Odstranjevanje s seznama želja...",
      removedFromWishlist: "Odstranjeno s seznama želja",

      pleaseAddItemsToCart: "Prosimo, dodajte izdelke v košarico",

      invalidUsernameOrPassword: "Neveljavno uporabniško ime ali geslo",
      loggingIn: "Prijavljanje...",
      loggedInSuccessfully: "Prijava uspešna",

      pleaseFillInAtLeastOneField: "Izpolnite vsaj eno polje",
      passwordsDontMatch: "Gesli se ne ujemata",
      pleaseFillInAllFields: "Prosimo, izpolnite vsa polja",

      pleaseEnterACode: "Prosimo, vnesite kodo",

      pleaseTryAgainLater: "Prosimo, poskusite znova kasneje",

      banned: "Izključen",
      create: "Ustvari",

      respondToRequest: "Odgovori na zahtevo",
      response: "Odgovor",
      writeYourResponseHere: "Napišite svoj odgovor tukaj",
    },
  },
};

const lng = JSON.parse(localStorage.getItem("language") || "en");

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
