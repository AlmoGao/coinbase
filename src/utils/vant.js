import { DropdownMenu, DropdownItem, Image as VanImage, Progress, Swipe, SwipeItem, Field, Button, NoticeBar, Icon, Dialog, Popover, ActionSheet } from 'vant';

import 'vant/lib/index.css';


export default app => {
    app.use(DropdownMenu);
    app.use(DropdownItem);
    app.use(VanImage);
    app.use(Progress);
    app.use(Swipe);
    app.use(SwipeItem);
    app.use(Field);
    app.use(Button);
    app.use(NoticeBar);
    app.use(Icon);
    app.use(Dialog);
    app.use(Popover);
    app.use(ActionSheet);
}