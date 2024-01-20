<template>
    <header class="wt-tab-header">
        <div class="wt-tab-header__menu w-100 webkit-drag">
            <div class="wt-tab-header__home webkit-no-drag">
                <div class="hstack gap-2">
                    <button class="wt-tab-header__btn--prev" @click="onClickPrevEvent" v-if="enablePrev">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.74039 0.25961C7.08654 0.605756 7.08654 1.16697 6.74039 1.51312L2.63987 5.61364L6.74039 9.71416C7.08654 10.0603 7.08654 10.6215 6.74039 10.9677C6.39424 11.3138 5.83303 11.3138 5.48688 10.9677L0.759611 6.24039C0.413465 5.89424 0.413465 5.33303 0.759611 4.98688L5.48688 0.25961C5.83303 -0.0865365 6.39424 -0.0865366 6.74039 0.25961Z" />
                        </svg>
                        <span class="ms-2">뒤로</span>
                    </button>
                    <button class="wt-tab-header__btn--home wt-text-white"
                        v-if="enableHome" @click="onClickMenuHome">
                        <template v-if="isEmpty(homeIcon)">
                            <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2438 5C12.407 5 12.5636 5.06485 12.679 5.18027L19.3073 11.8086C19.5477 12.0489 19.5477 12.4386 19.3073 12.679C19.0669 12.9194 18.6772 12.9194 18.4369 12.679L18.0243 12.2665L18.0672 17.7476L18.0635 18.3054L18.0636 18.3094L18.0672 18.8681C18.0683 19.032 18.0039 19.1896 17.8884 19.3059C17.7728 19.4222 17.6157 19.4876 17.4517 19.4876C17.4326 19.4876 17.3757 19.4885 17.2873 19.49L17.4517 19.4876C17.0015 19.4951 16.5049 19.503 16.8319 19.4977C16.7265 19.4995 17.0016 19.495 16.8319 19.4977C16.4925 19.5029 16.1806 19.4977 15.5912 19.4977C15.2731 19.4977 14.8626 19.4977 14.4017 19.4955C14.3745 19.4954 14.3476 19.4934 14.3211 19.4923C13.9823 19.4876 13.9413 19.4895 13.7141 19.4876H7.03583C6.8719 19.4876 6.71475 19.4222 6.59921 19.3059C6.48367 19.1896 6.4193 19.032 6.42036 18.8681L6.46323 12.2665L6.0507 12.679C5.81034 12.9194 5.42063 12.9194 5.18027 12.679C4.93991 12.4386 4.93991 12.0489 5.18027 11.8086L11.8086 5.18027C11.924 5.06485 12.0805 5 12.2438 5ZM7.82492 18.2566C7.79283 18.2566 7.76205 18.2438 7.73936 18.2212C7.71667 18.1985 7.70392 18.1677 7.70392 18.1356V11.2229L12.2438 6.60972L16.8322 11.2969V18.2566H14.3307C14.3308 18.2466 14.331 18.2364 14.3312 18.2259C14.3317 18.1981 14.3322 18.1662 14.3322 18.1356V15.1897C14.3322 14.8311 14.1898 14.4872 13.9362 14.2337C13.6827 13.9802 13.3388 13.8377 12.9803 13.8377H11.5073C11.1487 13.8377 10.8049 13.9802 10.5513 14.2337C10.2978 14.4872 10.1553 14.8311 10.1553 15.1897V18.1356C10.1553 18.1677 10.1426 18.1985 10.1199 18.2212C10.1082 18.2328 10.097 18.2446 10.0862 18.2566H7.82492ZM11.3809 18.2566C11.3845 18.2165 11.3863 18.1762 11.3863 18.1356V15.1897C11.3863 15.1576 11.3991 15.1268 11.4217 15.1041C11.4444 15.0814 11.4752 15.0687 11.5073 15.0687H12.9803C13.0123 15.0687 13.0431 15.0814 13.0658 15.1041C13.0885 15.1268 13.1012 15.1576 13.1012 15.1897V18.1356C13.1012 18.1459 13.101 18.1618 13.1006 18.1821C13.1002 18.2029 13.0997 18.2283 13.0994 18.2566H11.3809Z" />
                            </svg>
                        </template>
                        <template v-else>
                            <i :class="homeIcon"></i>
                        </template>
                        <span class="ms-2" v-if="!isEmpty(homeText)">{{ homeText }}</span>
                    </button>

                    <template v-if="enableNavi">

                        <button class="wt-tab-header__btn--navi" @click="onClickNavi(-1)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </button>

                        <button class="wt-tab-header__btn--navi" @click="onClickNavi(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </button>

                    </template>

                </div>

            </div>
            <div class="webkit-no-drag">
                <slot name="body"></slot>
            </div>
        </div>
        <div class="wt-tab-header__func webkit-no-drag">
            <div class="hstack gap-0">

                <div class="wt-tab-header__btn webkit-drag" v-if="enableMove">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                    </svg>
                </div>

                <button class="wt-tab-header__btn--top" v-if="enableOnTop"
                    :class="{'topped': isAlwaysOnTop}"
                    @click="onClickOnTop">
                    <template v-if="isAlwaysOnTop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-front" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2H5z"/>
                        </svg>
                    </template>                
                    <template v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                        </svg>
                    </template>
                </button>

                <button class="wt-tab-header__btn--pin" v-if="enablePin"
                    :class="{'pinned': isPinned}"
                    @click="onClickPin">
                    <template v-if="isPinned">
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.8176 5.55023L42.4502 16.1828C44.7427 18.4754 44.1155 22.3402 41.2157 23.7901L30.6711 29.0624C30.3788 29.2086 30.1553 29.4634 30.0486 29.7723L27.3645 37.5422C26.7012 39.4621 24.257 40.0251 22.8207 38.5888L17 32.7682L7.76777 42.0004H6V40.2326L15.2323 31.0004L9.41167 25.1798C7.97536 23.7435 8.53836 21.2992 10.4583 20.636L18.2281 17.9518C18.537 17.8451 18.7919 17.6217 18.938 17.3294L24.2103 6.78474C25.6602 3.88486 29.525 3.25768 31.8176 5.55023Z" fill="#212121"/>
                        </svg>
                    </template>
                    <template v-else>
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.4502 16.1828L31.8176 5.55023C29.525 3.25768 25.6602 3.88486 24.2103 6.78474L18.938 17.3294C18.7919 17.6217 18.537 17.8451 18.2281 17.9518L10.4583 20.636C8.53836 21.2992 7.97536 23.7435 9.41167 25.1798L15.2323 31.0004L6 40.2326V42.0004H7.76777L17 32.7682L22.8207 38.5888C24.257 40.0251 26.7012 39.4621 27.3645 37.5422L30.0486 29.7723C30.1553 29.4634 30.3788 29.2086 30.6711 29.0624L41.2157 23.7901C44.1155 22.3402 44.7427 18.4754 42.4502 16.1828ZM30.0498 7.318L40.6824 17.9506C41.7683 19.0365 41.4713 20.8672 40.0976 21.554L29.553 26.8264C28.6761 27.2648 28.0058 28.0293 27.6856 28.956L25.0015 36.7259C24.9412 36.9004 24.719 36.9516 24.5884 36.821L11.1794 23.412C11.0489 23.2815 11.1 23.0592 11.2746 22.999L19.0444 20.3148C19.9711 19.9947 20.7356 19.3243 21.1741 18.4474L26.4464 7.90276C27.1332 6.52914 28.9639 6.23205 30.0498 7.318Z" fill="#212121"/>
                        </svg>
                    </template>
                </button>

                <button class="wt-tab-header__btn"
                    :class="{'wt-bg-blink': needRefresh}"
                    v-if="enableSync" @click="onClickSyncEvent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.2506 5.18011C15.9994 5.50947 16.0627 5.9801 16.3921 6.23128C18.1804 7.59515 19.25 9.70821 19.25 12C19.25 15.736 16.4242 18.812 12.7933 19.2071L13.4697 18.5303C13.7626 18.2374 13.7626 17.7626 13.4697 17.4697C13.2034 17.2034 12.7867 17.1792 12.4931 17.3971L12.409 17.4697L10.409 19.4697C10.1427 19.7359 10.1185 20.1526 10.3364 20.4462L10.409 20.5303L12.409 22.5303C12.7019 22.8232 13.1768 22.8232 13.4697 22.5303C13.7359 22.2641 13.7601 21.8474 13.5423 21.5538L13.4697 21.4697L12.7194 20.7208C17.2154 20.355 20.75 16.5903 20.75 12C20.75 9.23526 19.4582 6.68321 17.3017 5.03856C16.9724 4.78738 16.5017 4.85075 16.2506 5.18011ZM10.5303 1.46967C10.2374 1.76256 10.2374 2.23744 10.5303 2.53033L11.2796 3.27923C6.78409 3.6456 3.25 7.41008 3.25 12C3.25 14.6445 4.43126 17.0974 6.43081 18.7491C6.75016 19.0129 7.22289 18.9679 7.48669 18.6485C7.75048 18.3292 7.70545 17.8564 7.3861 17.5926C5.72793 16.2229 4.75 14.1922 4.75 12C4.75 8.26436 7.57532 5.18861 11.2057 4.79301L10.5303 5.46967C10.2374 5.76256 10.2374 6.23744 10.5303 6.53033C10.8232 6.82322 11.2981 6.82322 11.591 6.53033L13.591 4.53033C13.8839 4.23744 13.8839 3.76256 13.591 3.46967L11.591 1.46967C11.2981 1.17678 10.8232 1.17678 10.5303 1.46967Z" fill="#212121"/>
                    </svg>
                </button>

                <button class="wt-tab-header__btn"
                    v-if="enableSetting" @click="onClickMenuSetting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </button>

                <button class="wt-tab-header__btn"
                    v-if="enableMaximize" @click="onClickMaximize">
                    <template v-if="isMaxized">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.4962 5.62668C21.3721 5.93448 22 6.76891 22 7.75V17.75C22 20.0972 20.0972 22 17.75 22H7.75C6.76891 22 5.93448 21.3721 5.62668 20.4962L7.72396 20.4996L17.75 20.5C19.2688 20.5 20.5 19.2688 20.5 17.75V7.75L20.496 7.69902L20.4962 5.62668ZM17.2468 2C18.4895 2 19.4968 3.00736 19.4968 4.25V17.2468C19.4968 18.4895 18.4895 19.4968 17.2468 19.4968H4.25C3.00736 19.4968 2 18.4895 2 17.2468V4.25C2 3.00736 3.00736 2 4.25 2H17.2468ZM17.2468 3.5H4.25C3.83579 3.5 3.5 3.83579 3.5 4.25V17.2468C3.5 17.661 3.83579 17.9968 4.25 17.9968H17.2468C17.661 17.9968 17.9968 17.661 17.9968 17.2468V4.25C17.9968 3.83579 17.661 3.5 17.2468 3.5Z" fill="#212121"/>
                        </svg>
                    </template>
                    <template v-else>
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 11.25C6 8.35051 8.3505 6 11.25 6H36.75C39.6495 6 42 8.3505 42 11.25V36.75C42 39.6495 39.6495 42 36.75 42H11.25C8.35051 42 6 39.6495 6 36.75V11.25ZM11.25 8.5C9.73122 8.5 8.5 9.73122 8.5 11.25V36.75C8.5 38.2688 9.73122 39.5 11.25 39.5H36.75C38.2688 39.5 39.5 38.2688 39.5 36.75V11.25C39.5 9.73122 38.2688 8.5 36.75 8.5H11.25Z" fill="#212121"/>
                        </svg>
                    </template>
                </button>

                <button class="wt-tab-header__btn"
                    v-if="enableSubmenu" @click="onClickSubMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"/>
                    </svg>
                </button>

                <button class="wt-tab-header__btn--exit"
                    v-if="enableExit" @click="onClickExitEvent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00985 6.99015C7.33375 6.66625 7.85888 6.66625 8.18278 6.99015L17.0296 15.8369C17.3534 16.1608 17.3534 16.686 17.0296 17.0099C16.7057 17.3337 16.1805 17.3337 15.8566 17.0099L7.00985 8.16308C6.68596 7.83918 6.68596 7.31404 7.00985 6.99015Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0296 6.99015C17.3534 7.31404 17.3534 7.83918 17.0296 8.16308L8.18278 17.0099C7.85888 17.3337 7.33375 17.3337 7.00985 17.0099C6.68596 16.686 6.68596 16.1608 7.00985 15.8369L15.8566 6.99015C16.1805 6.66625 16.7057 6.66625 17.0296 6.99015Z" />
                    </svg>
                </button>

            </div>
        </div>
    </header>
</template>
<script>
import { throttle } from 'lodash-es';

export default {
    props: {
        color: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: document.title,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        isAlwaysOnTop: {
            type: Boolean,
            default: false,
        },
        tabSelector: {
            type: String,
            default: "",
        },
        tabList: {
            type: Array,
            // default: function() {
            //     return [];
            // }
        },
        enablePrev: {
            type: Boolean,
            default: false,
        },
        enableSetting: {
            type: Boolean,
            default: false,
        },
        enableHome: {
            type: Boolean,
            default: false,
        },
        enableCast: {
            type: Boolean,
            default: false,
        },
        enableSplit: {
            type: Boolean,
            default: false,
        },
        enableSync: {
            type: Boolean,
            default: true,
        },
        enableExit: {
            type: Boolean,
            default: true,
        },
        enableDrag: {
            type: Boolean,
            default: true,
        },
        enableColorHeader: {
            type: Boolean,
            default: false,
        },
        enableSubmenu: {
            type: Boolean,
            default: false,
        },
        enablePin: {
            type: Boolean,
            default: false,
        },
        enableQueue: {
            type: Boolean,
            default: false,
        },
        enableMaximize: {
            type: Boolean,
            default: false,
        },
        enableNavi: {
            type: Boolean,
            default: false,
        },
        enableMove: {
            type: Boolean,
            default: false,
        },
        enableOnTop: {
            type: Boolean,
            default: false,
        },
        homeIcon: {
            Type: String,
            default: ""
        },
        homeText: {
            Type: String,
            default: ""
        },
        minSize: {
            type: Object,
            default: function() {
                return {
                    width: 500,
                    height: 48
                };
            }
        },
        isCenterWindow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        enableTabNavigation: function () {
            return this.tabList.length > 0;
        },
        dropdownTabList: function() {
            return this.tabList.filter(el => hasKeyIn(el, "type", "dropdown-item"));
        }
    },
    data: function () {
        return {
            isMaxized: false,
            beforeMax: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            selectedDropDownTab: null,
            needRefresh: false,
            lastTitleClick: 0,
            titleCount: 0
        };
    },
    mounted: function() {
        // AtronHelper.UnmaximizeWindow();
    },
    methods: {
        onClickTitleWithCtrl: function() {
            let now_ts = new Date().getUnix();
            if (now_ts - this.lastTitleClick < 1000)
                this.titleCount++;
            
            this.lastTitleClick = now_ts;

            if (this.titleCount > 5) {
                this.$emit("click-hidden");
                this.titleCount = 0;
            }
        },
        setNeedRefresh: function() {
            this.needRefresh = true;
        },
        onSelectDropDownTabItem: function(tab) {
            this.$emit("click-change", tab.value);
        },
        onClickMenuSetting: throttle(
            function () {
                this.$emit("click-setting");
            },
            500,
            { trailing: false }
        ),
        onClickPrevEvent: throttle(
            function () {
                this.$emit("click-prev");
            },
            500,
            { trailing: false }
        ),
        onClickMenuHome: throttle(
            function () {
                this.$emit("click-home");
            },
            500,
            { trailing: false }
        ),
        onClickCastEvent: function () {
            this.$emit("click-cast");
        },
        onClickSplitEvent: throttle(
            function () {
                this.$emit("click-split");
            },
            1000,
            { trailing: false }
        ),
        onClickSyncEvent: throttle(
            function () {
                this.needRefresh = false;
                this.$emit("click-sync");
            },
            1000,
            { trailing: false }
        ),
        onClickExitEvent: throttle(
            function () {
                this.$emit("click-exit");
            },
            500,
            { trailing: false }
        ),
        onClickTabEvent: throttle(function (tab) {
            if (this.tabSelector != tab) {
                this.selectedDropDownTab = null;
                this.$emit("click-change", tab);
            }
            this.$emit("click-tab", tab);
        }, 600, { 'trailing': false }),
        onClickSubMenu: throttle(
            function () {
                this.$emit("click-submenu");
            },
            500,
            { trailing: false }
        ),
        onClickPin: throttle(
            function () {
                this.$emit("click-pin");
            },
            1000,
            { trailing: false }
        ),
        onClickOnTop: throttle(
            function () {
                this.$emit("click-on-top");
            },
            1000,
            { trailing: false }
        ),
        onClickQueue: throttle(
            function () {
                this.$emit("click-queue");
            },
            1000,
            { trailing: false }
        ),
        onClickMaximize: throttle(
            async function () {
                // let is_max = await AtronHelper.IsMaximizedWindow();
                // let disp_size = await AtronHelper.GetDisplaySize();

                // if (is_max) {

                //     let new_bound = {
                //         x: Math.min(Math.max(this.beforeMax.x, 0), disp_size.width - this.minSize.width),
                //         y: Math.min(Math.max(this.beforeMax.y, 0), disp_size.height - this.minSize.height),
                //         width: Math.min(Math.max(this.beforeMax.width, this.minSize.width), disp_size.width),
                //         height: Math.min(Math.max(this.beforeMax.height, this.minSize.height), disp_size.height)
                //     };

                //     AtronHelper.UnmaximizeWindow();
                //     AtronHelper.UpdateWinBound();

                //     if (new_bound.x == 0 && new_bound.y == 0 && this.isCenterWindow) {
                //         AtronHelper.CenterWindow();
                //     }

                //     this.isMaxized = false;
                // } else {
                //     let { x, y } = await AtronHelper.GetCurrentPosition();
                //     this.beforeMax = {
                //         x: x,
                //         y: y,
                //         width: Math.max(document.documentElement.clientWidth,this.minSize.width),
                //         height: Math.max(document.documentElement.clientHeight,this.minSize.height),
                //     };

                //     AtronHelper.MaximizeWindow();
                //     this.isMaxized = true;
                // }

                // this.$emit("click-maximize", this.isMaxized);
            },
            1000,
            { trailing: false }
        ),
        onClickNavi: throttle(
            function (hist_v) {
                this.$emit("click-navi", hist_v);
            },
            1000,
            { trailing: false }
        ),
    },
}
</script>
