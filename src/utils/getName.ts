interface User {
    id: string
    name: string
    surname: string
}

function getNameById(id: string, users: User[]): string | null {
    const user = users?.find(user => user.id === id)
    return user ? `${user.name} ${user.surname}` : null
}

export default getNameById