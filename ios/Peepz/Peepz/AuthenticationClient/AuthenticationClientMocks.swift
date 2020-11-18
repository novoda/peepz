import Combine

extension AuthenticationClient {
    static var authenticated: AuthenticationClient {
        let subject = CurrentValueSubject<Bool, Never>(true)
        return AuthenticationClient(authenticated: subject.eraseToAnyPublisher(),
                                    signin: { subject.send(true) },
                                    signOut: { subject.send(false) },
                                    restore: { _ in /* no op */ })
    }

    static var notAuthenticated: AuthenticationClient {
        let subject = CurrentValueSubject<Bool, Never>(false)
        return AuthenticationClient(authenticated: subject.eraseToAnyPublisher(),
                                    signin: { subject.send(true) },
                                    signOut: { subject.send(false) },
                                    restore: { _ in /* no op */ })
    }
}
