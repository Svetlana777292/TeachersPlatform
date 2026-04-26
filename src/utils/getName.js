function getNameById(id, users) {
    const user = users.find(user => user.id === id)
    return user ? `${user.name} ${user.surname}` : null
}

export default getNameById