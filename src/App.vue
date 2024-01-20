<template>
    <div>
        <WriteHeader
            title="Write"
            enable-pin
            enable-on-top
            :is-pinned="isWinPinned"
            :is-always-on-top="isAlwaysOnTop"
            @click-on-top="onClickOnTop"
            @click-pin="onClickPin"
            @click-exit="onClickExit"
        />
        <div class="manuscript-container">
            <div class="manuscript">
                <!-- <p v-html="markdownTextAreaValue" contenteditable="true"></p> -->
                <p>
                    오늘도 또 우리 수탉이 막 쫓기었다. 내가 점심을 먹고 나무를 하러 갈
                    양으로 나올 때이었다. 산으로 올라서려니까 등뒤에서 푸르득푸드득,
                    하고 닭의 횃소리가 야단이다. 깜짝 놀라서 고개를 돌려보니
                    아니나다르랴, 두 놈이 또 얼리었다.
                </p>
            </div>
        </div>
    </div>
</template>
<script>
// import * as marked from 'marked';
import { debounce } from 'lodash-es';
import { isElectron } from './common/func.js';
import WriteHeader from './layout/writeHeader.vue';

export default {
    components: {
        WriteHeader,
    },
    data() {
        return {
            isElectron,
            isWinPinned: false,
            isAlwaysOnTop: false,
            markdownTextAreaValue: '',
        }
    },
    watch: {
        markdownTextAreaValue: {
            immeadiate: true,
            handler(oldVal, newVal) {
                if (oldVal !== '' && oldVal !== newVal) this.handleResize();
            }
        }
    },
    // computed: {
    //     compiledMarkdown () {
    //         return marked(this.markdownTextAreaValue, { sanitize: true })
    //     }
    // },
    methods: {
        onClickExit: function () {
            this.isAlwaysOnTop = false;
            // AtronHelper.HideWindow();
        },
        onClickPin: async function () {
            console.log('onClickPin');
        //     let { x, y } = await AtronHelper.GetCurrentPosition();
        //     let width = document.documentElement.clientWidth;
        //     let height = document.documentElement.clientHeight;

        //     let pin_result = await this.$cmd.pinWindow(x, y, width, height);

        //     if (!isEmpty(pin_result)) {
        //         if (pin_result.action == 'unpin') {
        //             AtronHelper.UpdateWinBound({
        //                 x: x,
        //                 y: y,
        //                 width: pin_result.bound.width,
        //                 height: pin_result.bound.height,
        //             });
        //             this.isWinPinned = false;
        //             this.$toast.Info(`윈도우 위치를 초기화하였습니다.`);
        //         } else {
        //             this.isWinPinned = true;
        //             this.$toast.Info(`윈도우 위치를 저장하였습니다.`);
        //         }
        //     } else {
        //         this.$toast.Error(`윈도우 위치를 저장하는 도중 오류가 발생하였습니다.`);
        //     }
        },
        onClickOnTop: function() {
            let to_on_top = true;
            if (this.isAlwaysOnTop)
                to_on_top = false;

            let result = this.$cmd.setAlwaysOnTop(to_on_top);
            if (result !== null)
                this.isAlwaysOnTop = result;
        },
        // 여기서부터 원고지
        handleResize() {
            const manuscript = document.querySelectorAll(".manuscript");

            manuscript.forEach((elt) => {
                this.resizeMnuascriptContainer(elt);
                this.resizeImage(elt);
            });
        },
        initManuscript() {
            const manuscript = document.querySelectorAll(".manuscript");

            window.addEventListener("load", this.handleResize, { passive: true });
            // window.addEventListener("resize", this.handleResize, { passive: true });

            manuscript.forEach((element) => {
                element.querySelectorAll("p").forEach((element) => {
                    const text = element.innerText;

                    element.innerHTML = "";
                    [...text].forEach((word) => {
                        const span = document.createElement("span");
                        const textNode = document.createTextNode(word);

                        span.appendChild(textNode);
                        element.append(span);
                    });
                });
            });
        },
        resizeMnuascriptContainer(element) {
            element.style.width = `${
                (Math.floor(element.parentElement.offsetWidth / 24) - 1) * 24 - 1
            }px`;
        },
        resizeImage(element) {
            element.querySelectorAll("img").forEach((img) => {
                const { naturalWidth, naturalHeight } = img;
                const ratio = naturalHeight / naturalWidth;
                const newHeight = element.offsetWidth * ratio;

                img.height = Math.floor(newHeight - (newHeight % 32) - 8);
            });
        },
        // 여기서부터 임시 마크다운 에디터
        update: debounce(function (e) {
          this.markdownTextAreaValue = e.target.value
        }),
    },
    mounted() {
        this.initManuscript();
        console.log(isElectron());
    }
    // setup() {
    //     console.log('👋 This message is being logged by "renderer.js", included via Vite');
    // }
}
</script>