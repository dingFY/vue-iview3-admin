import store from "@/store";

export default {
    bind(el, binding, vnode) {
        let auths = store.getters.auths.map(it => it.menuCode);
        let hasAuth = auths.includes(binding.value);
        if (hasAuth) {
            delete el.style.display;
        } else {
            el.style.display = "none";
        }
    }
}