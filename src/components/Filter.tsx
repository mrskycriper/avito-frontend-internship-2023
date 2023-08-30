import {Button, Dropdown, MenuProps, message, Select, SelectProps, Space} from "antd";
import {
    BarsOutlined,
    CalendarOutlined,
    DatabaseOutlined,
    FireOutlined,
    SortAscendingOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";

function Filter() {
    const handleOrderMenuClick: MenuProps['onClick'] = (e) => {
        message.info(`selected order: ${e.key}`);
    };

    const sortOrderOptions: MenuProps['items'] = [
        {
            label: 'Release date',
            key: '1',
            icon: <CalendarOutlined/>,
        },
        {
            label: 'Popularity',
            key: '2',
            icon: <UserOutlined/>,
        },
        {
            label: 'Alphabetical',
            key: '3',
            icon: <SortAscendingOutlined/>,
        },
        {
            label: 'Relevance',
            key: '4',
            icon: <FireOutlined/>,
        },
        {
            label: 'Default',
            key: '5',
            icon: <BarsOutlined/>,
        },
    ];

    const sortOrderMenuProps = {
        items: sortOrderOptions,
        selectable: true,
        defaultSelectedKeys: ['5'],
        onClick: handleOrderMenuClick,
    };

    const handlePlatformMenuClick: MenuProps['onClick'] = (e) => {
        message.info(`selected platform: ${e.key}`);
    };

    const platformFilterOptions: MenuProps['items'] = [
        {
            label: 'Browser',
            key: '1',
            icon: <CalendarOutlined/>,
        },
        {
            label: 'PC',
            key: '2',
            icon: <UserOutlined/>,
        },
        {
            label: 'All',
            key: '3',
            icon: <BarsOutlined/>,
        },
    ];

    const platformFilterMenuProps = {
        items: platformFilterOptions,
        selectable: true,
        defaultSelectedKeys: ['3'],
        onClick: handlePlatformMenuClick,
    };


    const genreTagList = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

    const genreFilterOptions: SelectProps['options'] = []

    genreTagList.forEach((item: string, index: number): void => {
        genreFilterOptions.push({label: item, value: item})
    });

    const handleTagChange = (value: string) => {
        message.info(`selected tags: ${value}`);
    };


    return (
        <Space wrap>
            <Dropdown menu={sortOrderMenuProps} placement="bottom" arrow={{pointAtCenter: true}}>
                <Button>
                    <Space>
                        Sort by
                        <SortAscendingOutlined/>
                    </Space>
                </Button>
            </Dropdown>
            <Dropdown menu={platformFilterMenuProps} placement="bottom" arrow={{pointAtCenter: true}}>
                <Button>
                    <Space>
                        Platform
                        <DatabaseOutlined/>
                    </Space>
                </Button>
            </Dropdown>
            <Select
                mode="tags"
                style={{width: '200px'}}
                placeholder="Select genre"
                onChange={handleTagChange}
                options={genreFilterOptions}
                maxTagCount={'responsive'}
            />
        </Space>
    )
}

export default Filter

