export const RoutesUtil = {
    Blog: {
        List: '/blogs',
        Create: '/blogs/create',
        Details: '/blogs/:id',
        Edit: '/blogs/:id/edit',
        goDetails: (id) => RoutesUtil.Blog.Details.replace(':id', id),
        goEdit: (id) => RoutesUtil.Blog.Edit.replace(':id', id)
    }
}