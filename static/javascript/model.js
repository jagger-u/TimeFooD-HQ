class ContainerGroup {
    constructor(containerGroupJoin, classSelected) {
        this.containerGroupJoin = containerGroupJoin;
        this.classSelected = classSelected;
        this.group = this.containerGroupJoin.selectAll(`#${this.classSelected}-g`);
        this.groupData = this.group.data([null]);
        this.groupEnter = this.groupData.enter();
        this.groupJoin = this.groupEnter.append('g').attr('id', `${this.classSelected}-g`);
        this.groupMerge = this.groupEnter.merge(this.groupData);
        this.groupExit = this.groupData.exit().remove();
    }
}

class GeneralUpdatePattern {
    constructor(classSelected, dataToBind, toAppend, containerGroupJoin) {
        this.classSelected = classSelected;
        this.dataToBind = dataToBind;
        this.toAppend = toAppend;
        this.container = new ContainerGroup(containerGroupJoin, classSelected);

        this.itself = this.container.groupData.merge(this.container.groupJoin).selectAll(`.${this.classSelected}`).data(this.dataToBind);
        this.enter = this.itself.enter();
        this.join = this.enter.append(this.toAppend).attr('class', `${this.classSelected}`);
        this.merge = this.itself.merge(this.join);
        this.exit = this.itself.exit();
    }
}
